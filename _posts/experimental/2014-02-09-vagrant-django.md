---
layout: post
title: Установка Django в среде Vagrant
author: Alexey Nurgaliev
section: experimental
---

Для размещения будет использоваться Apache с mod_wsgi.

### Vagrantfile

Содержимое Vagrantfile:

{% highlight ruby %}
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "precise32"
  config.vm.network :forwarded_port, guest: 80, host: 8001
  config.vm.provision "shell", path: "prov.sh"

end
{% endhighlight %}

* `precise32` - стандартная виртуальная машина (Vagrant box) с Ubuntu 12.04 LTS x86
* Порт 80 ВМ транслируется на порт 8001 хоста
* Для первичной настройки ВМ запускается скрипт `prov.sh`

### Provision

Содержимое файла `prov.sh`:

{% highlight sh %}
#!/bin/bash

sudo apt-get update
sudo apt-get install -y apache2 libapache2-mod-wsgi-py3 python3.2

wget -O Django-1.6.2.tar.gz https://www.djangoproject.com/download/1.6.2/tarball/
tar xzvf Django-1.6.2.tar.gz
cd Django-1.6.2
sudo python3 setup.py install

sudo cp ./default /etc/apache2/sites-available/default
sudo service apache2 restart
{% endhighlight %}

* Устанавливается Python 3
* Django устанавливается через setup.py (т.к. почему-то в репозитории Ubuntu 12.04 больше нет `python3-pip`)
* Заменяется конфигурация стандартного виртуального хоста apache

### Конфигурация Apache

Содержимое файла `default`:

{% highlight text %}
<VirtualHost *:80>

WSGIScriptAlias / /vagrant/test_deploy/test_deploy/wsgi.py

<Directory /vagrant/test_deploy/test_deploy>  
	<Files wsgi.py>
		Order deny,allow
		Allow from all
	</Files>
</Directory>

Alias /static/ /vagrant/test_deploy/static/

<Directory /vagrant/test_deploy/static>
	Order deny,allow
	Allow from all
</Directory>

ErrorLog /vagrant/error.log

</VirtualHost>
{% endhighlight %}

* Виртуальный хост использует порт 80
* `test_deploy` нужно заменить на название каталога с сайтом
* Доступом к статическим файлам управляет apache (файлы хранятся в каталоге `test_deploy/static/`)

### Настройка проекта

Чтобы модули проекта были видны для mod_wsgi, в файл `test_deploy/test_deploy/wsgi.py` нужно добавить строки:

{% highlight python %}
import sys
...
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
{% endhighlight %}

Чтобы статические файлы собирались в каталог `test_deploy/static/`, нужно в файл `test_deploy/test_deploy/settings.py` добавить строку:

{% highlight python %}
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
{% endhighlight %}