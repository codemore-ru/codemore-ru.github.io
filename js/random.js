 function start_random() {
	var arr = [ 
		"abcdefghijklmnopqrstuvwxyz", 
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
		"0123456789",
		"!@#$%^&*()_+*/\\|,.?{}[]:;'\"<>"
	];
	
	var str = "";
	str += arr[0];
	str += arr[1];
	str += arr[2];
	str += arr[3];
	
	var rez = "";
	for(var i = 0; i < 10; ++i)
		rez += str[Math.floor(str.length * Math.random())];
	document.getElementById('text').value = rez;
}