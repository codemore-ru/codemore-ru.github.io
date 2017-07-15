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
	if (document.getElementById('arr4').checked) str += document.getElementById('user').value;
	
	var value_count = document.getElementById('length').value;
	
	if (!isFinite(parseFloat(value_count))){
		document.getElementById('text').value = 'Задайте длину последовательности - целое число от 1 до 99 включительно';
		return;
	}

	if (str.length == 0) {
		document.getElementById('text').value = "Укажите из каких знаков генерировать последовательность";
		return;
	}
	
	var rez = "";
	for(var i = 0; i < value_count; ++i){
		var ch = str[Math.floor(str.length * Math.random())];
		if (ch == '<') ch = '&lt';
		if (ch == '&') ch = '&amp';
		rez += ch;
	}
	
	var table = document.getElementById('table');
	table.innerHTML = '<tr><td bordercolor=black style="height:5px">' + rez + '</td></tr>' + table.innerHTML;
}