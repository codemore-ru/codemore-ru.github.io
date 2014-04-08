
var canvas, context, geom, res_color;
var r_min = 2;
var cx = 0.36;
var cy = 0.36;

$(function() {
    canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');

    geom = new FractalGeometry(-1.5, 1.5, -1.5, 1.5, 100, 2);
    res_color = new Color(0, 0, 0xFF);

    //bind events
    $('#redraw').click(fractalRedraw);
    $('#resetForm').click(resetParams);

    drawFractal(context, canvas.width, canvas.height, geom, res_color, juliaIteration);
});

function juliaIteration(x0, y0) {
    var r_sq = r_min * r_min;
    var xk = x0;
    var yk = y0;
    var pow_x, pow_y, rx, ry, x, y;
    for(var i = 0; i < geom.k_max; i++){

        if(geom.n == 2) {
            x = (xk * xk) - (yk * yk) + cx;
            y = 2 * xk * yk + cy;
        } else {
            //complex way
            rx = xk;
            ry = yk;
            for(var j = 2; j <= geom.n; j++) {
                pow_x = xk * rx - yk * ry;
                pow_y = rx * yk + ry * xk;
                rx = pow_x;
                ry = pow_y;
            }
            x = rx + cx;
            y = ry + cy;
        }

        if(x * x + y * y > r_sq) {
            return i;
        }

        xk = x;
        yk = y;
    }
    return geom.k_max;
}

function resetParams() {
    $('#kmax').val(100);
    $('#rmin').val(2);
    $('#n').val(2);
    $('#color').val('0000FF');
    $('#cx').val(0.36);
    $('#cy').val(0.36);
}

function fractalRedraw() {
    getParams();
    drawFractal(context, canvas.width, canvas.height, geom, res_color, juliaIteration);
}

function getParams() {
    //reset errors
    $('#errors').children().remove();

    geom.k_max = getParam('#kmax', 'K<sub>max</sub>', 100, true);
    geom.n = getParam('#n', 'N', 2, true);
    r_min = getParam('#rmin', 'R<sub>min</sub>', 2, true);
    cx = getParam('#cx', 'cx', 0.36, false);
    cy = getParam('#cy', 'cy', 0.36, false);

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