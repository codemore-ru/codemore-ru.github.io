#!/bin/bash

sudo apt-get install -y ruby python-pip g++ make mc apache2
sudo pip install Pygments
sudo gem install jekyll
sudo gem install RedCarpet

mkdir -p /vagrant/_site
sudo rm -rf /var/www
sudo ln -s /vagrant/_site /var/www