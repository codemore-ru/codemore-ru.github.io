#!/bin/bash

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y ruby python-pip g++ make mc apache2
pip install Pygments
gem install jekyll
gem install RedCloth
gem install kramdown

mkdir -p /vagrant/_site
sudo rm -rf /var/www
sudo ln -s /vagrant/_site /var/www