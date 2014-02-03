var subtitle = ['исправлено и дополнено', 
                'это только начало',
				'больше кода'];

var st = document.getElementById('subtitle');
var rand = Math.round(Math.random() * (subtitle.length - 1));
st.innerHTML = '[' + subtitle[rand] + ']';
