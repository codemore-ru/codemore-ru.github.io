function start_random() {
	var str, rez;
	for (var i = 'a'; i <= 'z'; ++i) str += i;
	for (var i = 'A'; i <= 'Z'; ++i) str += i;
	for (var i = '0'; i <= '9'; ++i) str += i;
	str += "!@#$%^&*()_+*/\\|,.?{}[]:;'\"<>";
	for(var i = 0; i < 10; ++i)
		rez += str[Math.floor(str.length() * Math.random())];
	document.getElementById('text').value = rez;
}