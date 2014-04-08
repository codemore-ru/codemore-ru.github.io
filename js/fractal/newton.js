
var canvas, context, geom, res_color;
var r_min = 0.0001;

$(function() {
    canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');

    geom = new FractalGeometry(-1, 1, -1, 1, 50, 3);
    res_color = new Color(0, 0, 0xFF);

    //bind events
    $('#redraw').click(fractalRedraw);
    $('#resetForm').click(resetParams);

    drawFractal(context, canvas.width, canvas.height, geom, res_color, newtonIteration);
});

function newtonIteration(cx, cy) {
    var r_sq = r_min * r_min;
    var xk = cx;
    var yk = cy;
    var pow_x, pow_y, pow_p_x, pow_p_y, rx, ry, x, y;
    var div;
    for(var i = 0; i < geom.k_max; i++){

        //pow_p = Zk^(N-1)
        pow_p_x = 1;
        pow_p_y = 0;
        for(var j = 1; j < geom.n; j++) {
            pow_x = xk * pow_p_x - yk * pow_p_y;
            pow_y = pow_p_x * yk + pow_p_y * xk;
            pow_p_x = pow_x;
            pow_p_y = pow_y;
        }

        //pow = Z^N - 1
        pow_x = (xk * pow_p_x - yk * pow_p_y) - 1;
        pow_y = (pow_p_x * yk + pow_p_y * xk);

        //pow_p = N * pow_p
        pow_p_x = geom.n * pow_p_x;
        pow_p_y = geom.n * pow_p_y;

        //Zk - pow / pow_p
        div = pow_p_x * pow_p_x + pow_p_y * pow_p_y;
        x = xk - (pow_x * pow_p_x + pow_y * pow_p_y) / div;
        y = yk - (pow_p_x * pow_y - pow_p_y * pow_x) / div;

        //|Z^N - 1| < rmin
        pow_p_x = 1;
        pow_p_y = 0;
        for(var j = 1; j <= geom.n; j++) {
            pow_x = x * pow_p_x - y * pow_p_y;
            pow_y = pow_p_x * y + pow_p_y * x;
            pow_p_x = pow_x;
            pow_p_y = pow_y;
        }
        if(Math.abs(pow_p_x*pow_p_x + pow_p_y*pow_p_y - 1) <= r_sq) {
            return i;
        }

        xk = x;
        yk = y;
    }
    return geom.k_max;
}

function resetParams() {
    $('#kmax').val(50);
    $('#rmin').val(0.0001);
    $('#n').val(3);
    $('#color').val('0000FF');
}

function fractalRedraw() {
    getParams();
    drawFractal(context, canvas.width, canvas.height, geom, res_color, newtonIteration);
}

function getParams() {
    //reset errors
    $('#errors').children().remove();

    geom.k_max = getParam('#kmax', 'K<sub>max</sub>', 50, true);
    r_min = getParam('#rmin', 'R<sub>min</sub>', 0.0001, true);
    geom.n = getParam('#n', 'N', 3, true);

    //color
    color = parseInt($('#color').val(), 16);
    if(isNaN(color) || color < 0 || color > 0xFFFFFF) {
        $('<p>Неправильное значение цвета. Используется значение по умолчанию (#0000FF).</p>').appendTo('#errors');
        color = 0x0000FF;
    }
    res_color.b = color % 0x100;
    res_color.g = Math.floor((color % 0x10000) / 0x100);
    res_color.r = Math.floor((color / 0x10000));
}