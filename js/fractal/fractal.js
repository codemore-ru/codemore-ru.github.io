
function FractalGeometry(x_min, x_max, y_min, y_max, k_max) {
    this.x_min = x_min;
    this.x_max = x_max;
    this.y_min = y_min;
    this.y_max = y_max;
    this.k_max = k_max;
}

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

function drawFractal(context, width, height, geom, res_color, iteration) {
    var dx = (geom.x_max - geom.x_min) / width;
    var dy = (geom.y_max - geom.y_min) / height;

    var imageData = context.createImageData(width, height);
    var pixelData = imageData.data;
    var currentPixel = 0;

    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var k = iteration(geom.x_min + x * dx, geom.y_min + y * dy);
            pixelData[currentPixel + 0] = res_color.r;
            pixelData[currentPixel + 1] = res_color.g;
            pixelData[currentPixel + 2] = res_color.b;
            pixelData[currentPixel + 3] = Math.round(255 * (k / geom.k_max));
            currentPixel += 4;
        }
    }
    context.putImageData(imageData, 0, 0);
}

function getParam(selector, name, defaultValue, checkPositive) {
    value = parseFloat($(selector).val());
    if(isNaN(value) || (checkPositive && value <= 0)) {
        $('<p>Неправильное значение ' + name +'. Используется значение по умолчанию (' + defaultValue.toString() + ').</p>').appendTo('#errors');
        return defaultValue;
    }
    return value;
}