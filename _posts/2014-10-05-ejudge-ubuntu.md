---
layout: post
title: Установка ejudge в Ubuntu 20.04 LTS
author: Alexey Nurgaliev
---

[ejudge](https://ejudge.ru/) - система для проведения онлайн-соревнований по программированию. 
[Документация системы](https://ejudge.ru/wiki/index.php/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_ejudge) 

Будет рассмотрена установка версии 3.8.0.

## Предварительная настройка

Загрузка и установка пакетов. Создается пользователь и группа ejudge. 
Также создаются рабочие каталоги.

{% highlight bash linenos %}
#!/bin/bash

#Зависимости и компиляторы
sudo apt-get update
sudo apt-get install -y sendmail ncurses-base libncurses-dev libncursesw5 \
  libncursesw5-dev expat libexpat1 libexpat1-dev zlib1g-dev libelf-dev \
  g++ gawk apache2 gettext fpc mc openjdk-8-jdk \
  libcurl4-openssl-dev libzip-dev uuid-dev bison flex \
  mono-devel mono-runtime mono-vbnc php7.4-cli perl \
  ruby python python3 gccgo locales net-tools

sudo locale-gen en_US.UTF-8 ru_RU.UTF-8

#Установка FreeBASIC x86_64 (нет в репозитории)
wget -O freebasic.tar.gz http://downloads.sourceforge.net/fbc/FreeBASIC-1.03.0-linux-x86_64.tar.gz?download
sudo tar -xvf freebasic.tar.gz -C /opt/
cd /opt/FreeBASIC-1.03.0-linux-x86_64/
sudo ./install.sh -i
cd

#Или FreeBASIC x86 для 32-битных ОС
#wget -O freebasic.tar.gz http://downloads.sourceforge.net/fbc/FreeBASIC-1.03.0-linux-x86.tar.gz?download
#sudo tar -xvf freebasic.tar.gz -C /opt/
#cd /opt/FreeBASIC-1.03.0-linux-x86/
#sudo ./install.sh -i
#cd

#Создание группы и пользователя ejudge
sudo groupadd ejudge
sudo useradd ejudge -s /bin/bash -m -d /home/ejudge -g ejudge
sudo adduser ejudge sudo

#Создание рабочего каталога judges
sudo mkdir -p /home/judges /home/judges/test_work
sudo chown ejudge:ejudge /home/judges /home/judges/test_work
sudo chmod 0755 /home/judges /home/judges/test_work

#Каталоги сервера
sudo mkdir -p /var/www/ejudge/cgi-bin
sudo mkdir -p /var/www/ejudge/htdocs
sudo chmod 0777 /var/www/ejudge/cgi-bin /var/www/ejudge/htdocs

#Включение модуля CGI
sudo a2enmod cgi
sudo service apache2 restart
{% endhighlight %}

## Сборка ejudge

Собирать и устанавливать лучше под пользователем ejudge. 
Пример, как можно сменить пользователя: `sudo su ejudge`

{% highlight bash linenos %}
#!/bin/bash

cd /home/ejudge

#Загрузка ejudge
wget --no-check-certificate http://www.ejudge.ru/download/ejudge-3.8.0.tgz
tar -xvzf ejudge-3.8.0.tgz

cd ejudge

#Сборка
./configure --prefix=/home/ejudge/inst-ejudge \
            --enable-contests-home-dir=/home/judges \
            --with-httpd-cgi-bin-dir=/var/www/ejudge/cgi-bin \
            --with-httpd-htdocs-dir=/var/www/ejudge/htdocs \
            --with-primary-user="ejudge" \
            --with-exec-user="ejudge" \
            --with-compile-user="ejudge" \
            --enable-ajax \
            --enable-charset=utf-8

make
make install
{% endhighlight %}

## Конфигурация

Запуск программы конфигурации: `/home/ejudge/ejudge/ejudge-setup`

Нужно указать *Test Working Dir* - `/home/judges/test_work`

Также нужно не забыть указать данные администратора в разделе *Administrator identity*

Сохранить конфигурацию в файл `ejudge-install.sh`.

## Установка

Запустить от имени root: `sudo /home/ejudge/ejudge/ejudge-install.sh`

## Запуск

Запускается система **только** от имени пользователя ejudge!

Переход в каталог установки: `cd /home/ejudge/inst-ejudge/bin`

Формирование ресурсов для веб-интерфейса: `./ejudge-upgrade-web`

Запуск ejudge: `./ejudge-control start`

## Настройка apache2

Пример конфигурации виртуального хоста для apache2 версии 2.4 
(файл `/etc/apache2/sites-enabled/ejudge.conf`, возможно потребуется удалить существующую конфигурацию):

{% highlight apacheconf linenos %}
<VirtualHost *:80>
    DocumentRoot /var/www/ejudge/htdocs

    ScriptAlias /cgi-bin/ "/var/www/ejudge/cgi-bin/"

    <Directory "/var/www/ejudge/cgi-bin">
        Options +ExecCGI +FollowSymLinks +Includes
        AllowOverride None
        Require all granted
    </Directory>

    <Directory "/var/www/ejudge/htdocs">
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
{% endhighlight %}

Перезапустить apache: `service apache2 restart`

ejudge будет доступен по адресу http://localhost/cgi-bin/serve-control

## Настройка nginx

Пример настройки nginx + fcgiwrap.

Установка пакетов:

{% highlight bash linenos %}
#Удаление apache
sudo apt-get remove --autoremove apache2

#Установка nginx
sudo apt-get install nginx fcgiwrap
{% endhighlight %}

Конфигурация сервера (файл `/etc/nginx/sites-enabled/ejudge`):

{% highlight nginx linenos %}
    server {

     listen 80;
     server_name localhost;
     root /var/www/ejudge/htdocs/;

     location ~ ^/cgi-bin/.* {
            gzip           off;
            root           /var/www/ejudge/;
            fastcgi_pass   unix:/var/run/fcgiwrap.socket;

            fastcgi_param  QUERY_STRING       $query_string;
            fastcgi_param  REQUEST_METHOD     $request_method;
            fastcgi_param  CONTENT_TYPE       $content_type;
            fastcgi_param  CONTENT_LENGTH     $content_length;

            fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
            fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
            fastcgi_param  REQUEST_URI        $request_uri;
            fastcgi_param  DOCUMENT_URI       $document_uri;
            fastcgi_param  DOCUMENT_ROOT      $document_root;
            fastcgi_param  SERVER_PROTOCOL    $server_protocol;

            fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
            fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;

            fastcgi_param  REMOTE_ADDR        $remote_addr;
            fastcgi_param  REMOTE_PORT        $remote_port;
            fastcgi_param  SERVER_ADDR        $server_addr;
            fastcgi_param  SERVER_PORT        $server_port;
            fastcgi_param  SERVER_NAME        $host;
        }
    }
{% endhighlight %}

Конфигурация основана на статье в [debian wiki](https://wiki.debian.org/ru/nginx/FastCGI).

ejudge также будет доступен по адресу http://localhost:80

## Проверка установки

Если все сделано правильно, то административный интерфейс ejudge будет доступен по адресу 
`http://localhost/cgi-bin/serve-control`
