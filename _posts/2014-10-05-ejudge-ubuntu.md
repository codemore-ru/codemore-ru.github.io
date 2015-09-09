---
layout: post
title: Установка ejudge в Ubuntu 14.04 LTS
author: Alexey Nurgaliev
---

[ejudge](https://ejudge.ru/) - система для проведения онлайн-соревнований по программированию. 
[Документация системы](https://ejudge.ru/wiki/index.php/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_ejudge) 

Будет рассмотрена установка версии 3.4.1. Проверено на виртуальных машинах в Vagrant и на облачном сервере DigitalOcean

##Предварительная настройка

Для возможности выбора русского языка интерфейса может потребоваться установка дополнительной локали. Для этого нужно 
в файл `/var/lib/locales/supported.d/local` добавить строчку `ru_RU.UTF-8 UTF-8` и запустить команду 
`sudo dpkg-reconfigure locales`.

Загрузка и установка пакетов. Создается пользователь и группа ejudge. Также создаются рабочие каталоги.

{% highlight sh %}
#!/bin/bash

#Зависимоти и компиляторы
sudo apt-get update
sudo apt-get install -y bison flex gawk ncurses-base libncurses-dev libncursesw5 \
  libncursesw5-dev expat libexpat1 libexpat1-dev zlib1g-dev libelf-dev \
  g++ sendmail apache2 gettext fpc mc openjdk-7-jdk \
  libcurl4-openssl-dev libzip-dev uuid-dev \
  mono-devel mono-runtime mono-vbnc php5-cli perl \
  ruby python python3 gccgo 

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

#создание группы и пользователя ejudge
sudo groupadd ejudge
sudo useradd ejudge -s /bin/bash -m -d /home/ejudge -g ejudge
sudo adduser ejudge sudo

#создание рабочего каталога judges
sudo mkdir -p /home/judges /home/judges/test_work
sudo chown ejudge:ejudge /home/judges /home/judges/test_work
sudo chmod 0755 /home/judges /home/judges/test_work

#каталоги сервера
sudo mkdir -p /var/www/ejudge/cgi-bin
sudo mkdir -p /var/www/ejudge/htdocs
sudo chmod 0777 /var/www/ejudge/cgi-bin /var/www/ejudge/htdocs

#включение модуля CGI
sudo a2enmod cgi
sudo service apache2 restart
{% endhighlight %}

##Сборка ejudge

Собирать и устанавливать лучше под пользователем ejudge. Пример, как можно сменить пользователя: `sudo su ejudge`

{% highlight sh %}
#!/bin/bash

cd /home/ejudge

#загрузка ejudge
wget --no-check-certificate http://www.ejudge.ru/download/ejudge-3.4.1.tgz
tar -xvzf ejudge-3.4.1.tgz

cd ejudge

./configure --prefix=/home/ejudge/inst-ejudge \
  --enable-contests-home-dir=/home/judges \
  --with-httpd-cgi-bin-dir=/var/www/ejudge/cgi-bin \
  --with-httpd-htdocs-dir=/var/www/ejudge/htdocs \
  --enable-ajax \
  --enable-charset=utf-8

make
make install
{% endhighlight %}

##Конфигурация

Запуск программы конфигурации: `/home/ejudge/ejudge/ejudge-setup`

Нужно указать *Test Working Dir* - `/home/judges/test_work`

Также нужно не забыть указать данные администратора в разделе *Administrator identity*

##Установка

Запустить от имени root: `sudo /home/ejudge/ejudge/ejudge-install.sh`

##Запуск

Запускается система **только** от имени пользователя ejudge!

Переход в каталог установки: `cd /home/ejudge/inst-ejudge/bin`

Формирование ресурсов для веб-интерфейса: `./ejudge-upgrade-web`

Запуск ejudge: `./ejudge-control start`

##Настройка apache2

Пример конфигурации виртуального хоста для apache2 версии 2.4:

{% highlight apache %}
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

ejudge будет доступен по адресу http://localhost:80

##Проверка установки

Если все сделано правильно, то административный интерфейс ejudge будет доступен по адресу 
`http://localhost/cgi-bin/serve-control`
