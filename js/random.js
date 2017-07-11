 function start_random() {
	var arr = [ 
		"abcdefghijklmnopqrstuvwxyz", 
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
		"0123456789",
		"!@#$%^&*()_+*/\\|,.?{}[]:;'\"<>"
	];
	
	var str = "";
	if (document.getElementById('arr0').checked) str += arr[0];
	if (document.getElementById('arr1').checked) str += arr[1];
	if (document.getElementById('arr2').checked) str += arr[2];
	if (document.getElementById('arr3').checked) str += arr[3];
	
	var rez = "";
	for(var i = 0; i < 10; ++i)
		rez += str[Math.floor(str.length * Math.random())];
	document.getElementById('text').value = rez;
}