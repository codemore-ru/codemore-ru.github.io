VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|	
	config.vm.box = "precise32"	
	config.vm.network "forwarded_port", guest: 80, host: 8001	
	config.vm.provision "shell", path: "provision.sh"
end
