var contextClass = (window.AudioContext ||
					window.webkitAudioContext ||
					window.mozAudioContext ||
					window.oAudioContext ||
					window.msAudioContext);
					
var value = 0.1;

if (contextClass) {
	// Web Audio API is available.
	var context = new contextClass();
}

var oscillator1, oscillator2;

var dialTone = function(freq1, freq2){
	oscillator1 = context.createOscillator();
	oscillator1.type = 0;
	oscillator1.frequency.value = freq1;
	gainNode = context.createGain ? context.createGain() : context.createGainNode();
	oscillator1.connect(gainNode,0,0);
	gainNode.connect(context.destination);
	gainNode.gain.value = value;
	oscillator1.start ? oscillator1.start(0) : oscillator1.noteOn(0)

	oscillator2 = context.createOscillator();
	oscillator2.type = 0;
	oscillator2.frequency.value = freq2;
	gainNode = context.createGain ? context.createGain() : context. createGainNode();
	oscillator2.connect(gainNode);
	gainNode.connect(context.destination);

	gainNode.gain.value = value;
	oscillator2.start ? oscillator2.start(0) : oscillator2.noteOn(0)
};

function start(freq1,freq2) {
	if (typeof oscillator1 != 'undefined') oscillator1.disconnect();
	if (typeof oscillator2 != 'undefined') oscillator2.disconnect();
	dialTone(freq1,freq2);
}

function stop() {
	oscillator1.disconnect();
	oscillator2.disconnect();
}

function valueUp(){
	value += 0.1;
	if (value > 1.0) value = 1.0;
}

function valueDown(){
	value -= 0.1;
	if (value < 0.0) value = 0.0;
}

function OX(cnt){
	cnt.beginPath();
	cnt.moveTo(0,100);
	cnt.lineTo(800,100);
	cnt.lineTo(790, 95);
	cnt.moveTo(800,100);
	cnt.lineTo(790,105);
	cnt.strokeStyle = 'Black';
	cnt.stroke();
}
function OY(cnt){
	cnt.beginPath();
	cnt.moveTo(10,200);
	cnt.lineTo(10,0);
	cnt.lineTo(5,10);
	cnt.moveTo(10,0);
	cnt.lineTo(15,10);
	cnt.strokeStyle = 'Black';
	cnt.stroke();
}

function Sin(cnt, color){
	var frequency_1 = document.getElementById('frequency_1').value;
	var frequency_2 = document.getElementById('frequency_2').value;
	cnt.beginPath();
	cnt.moveTo(10,150);
	for(var x = 0; x < 700; ++x){
		var y1 = Math.sin(x * Math.PI / 180.0 * frequency_1);
		var y2 = Math.sin(x * Math.PI / 180.0 * frequency_2);
		cnt.lineTo(10 + x, 100 + 50 * (y1 + y2));
	}
	cnt.strokeStyle = color;
	cnt.stroke();
}

// arr - массив данных,
// cnt_step - сколько шагов выводить,
// step - количество пикселей на один шаг
function DrawFunction(cnt_step, step){
	var arr;
	for(var i = 0; i < cnt_step; ++i){
		arr[i] = 2;
	}
	return arr;
}

function Draw(name, frequency, color){
	cnv = document.getElementById(name);
	cnv.width = '800';
	cnv.height = '200';
	cnt = cnv.getContext('2d');
	OX(cnt);
	OY(cnt);
	Sin(cnt, color);
}

function DrawDraw(frequency){
	Draw('fun_time', frequency, 'red');
	Draw('fun_w', frequency, 'blue');
}

function fft(arr){
}