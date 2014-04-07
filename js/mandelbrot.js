var x_min = -2;
var x_max = 1;
var y_min = -1.5;
var y_max = 1.5;
var k_max = 100;
var r_min = 2;

var res_color_r = 0;
var res_color_g = 0;
var res_color_b = 255;

var canvas, context;

$(function() {
    canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');

    //bind events
    $('#redraw').click(fractalRedraw);
    $('#resetForm').click(resetParams);

    drawMandelbrot();
});

function drawMandelbrot() {
    var width = canvas.width;
    var height = canvas.height;
    var dx = (x_max - x_min) / width;
    var dy = (y_max - y_min) / height;

    var imageData = context.createImageData(width, height);
    var pixelData = imageData.data;
    var currentPixel = 0;

    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var k = mandelbrotIteration(x_min + x * dx, y_min + y * dy);
            pixelData[currentPixel + 0] = res_color_r;
            pixelData[currentPixel + 1] = res_color_g;
            pixelData[currentPixel + 2] = res_color_b;
            pixelData[currentPixel + 3] = Math.round(255 * (k / k_max));
            currentPixel += 4;
        }
    }
    context.putImageData(imageData, 0, 0);
}

function mandelbrotIteration(cx, cy) {
    var r_sq = r_min * r_min;
    var xk = cx;
    var yk = cy;
    for(var i = 0; i < k_max; i++){
        var x = (xk * xk) - (yk * yk) + cx;
        var y = 2 * xk * yk + cy;
        if(x * x + y * y > r_sq) {
            return i;
        }
        xk = x;
        yk = y;
    }
    return k_max;
}

function resetParams() {
    $('#kmax').val(100);
    $('#rmin').val(2);
    $('#color').val('0000FF');
}

function fractalRedraw() {
    getParams();
    drawMandelbrot();
}

function getParams() {
    //reset errors
    $('#errors').children().remove();

    //Kmax
    k_max = parseInt($('#kmax').val());
    if(isNaN(k_max) || k_max <= 0) {
        $('<p>Неправильное значение K<sub>max</sub>. Используется значение по умодчанию (100).</p>').appendTo('#errors');
        k_max = 100;
    }

    //Rmin
    r_min = parseFloat($('#rmin').val());
    if(isNaN(r_min) || r_min <= 0) {
        $('<p>Неправильное значение R<sub>min</sub>. Используется значение по умодчанию (2).</p>').appendTo('#errors');
        r_min = 2;
    }

    //color
    color = parseInt($('#color').val(), 16);
    if(isNaN(color) || color < 0 || color > 0xFFFFFF) {
        $('<p>Неправильное значение цвета. Используется значение по умодчанию (#0000FF).</p>').appendTo('#errors');
        color = 0x0000FF;
    }
    res_color_b = color % 0x100;
    res_color_g = Math.floor((color % 0x10000) / 0x100);
    res_color_r = Math.floor((color / 0x10000));
}