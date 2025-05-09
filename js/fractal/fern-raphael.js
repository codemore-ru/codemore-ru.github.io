var width = 400;
var paper, fern, res_color;

var side = 1, eps = 0.5, n = 10;
var k1 = 0.0483, k2 = 0.162;
var m1 = 0.371, m2 = 0.336, m3 = 0.849;
var phi0 = 14.9 * Math.PI / 180;
var phi1 = 37.7 * Math.PI / 180;
var phi2 = 36.8 * Math.PI / 180;
var phi3 = 17.6 * Math.PI / 180;
var random = false;
var deviation = 10;

$(function() {
    paper = Raphael('paper', width, width);

    //bind events
    $('#redraw').click(fractalRedraw);
    $('#resetForm').click(resetParams);

    resetParams();
    fractalRedraw();
});

function drawFractal() {
    paper.clear();
    fern = '';
    drawFern(width / 2, 0, width, 0, side, n);
    paper.path(fern).attr('stroke', res_color);
}

function drawFern(x0, y0, h, psi, side, rec) {
    if(rec == 0 || k2 * h < eps) {
        return ;
    }
    var p1x = x0 - (k1 * h) * Math.sin(psi);
    var p1y = y0 + (k1 * h) * Math.cos(psi);

    var p2x = x0 - (k2 * h) * Math.sin(psi);
    var p2y = y0 + (k2 * h) * Math.cos(psi);

    fern += 'M' + x0 + ',' + (width - y0) + 'L' + p2x + ',' + (width - p2y);

    drawFern(p1x, p1y, m1 * h, psi - side * (phi1 + phi0 + (random ? randomDeviation() : 0)), -side, rec - 1);
    drawFern(p2x, p2y, m2 * h, psi + side * (phi2 + phi0 + (random ? randomDeviation() : 0)), side, rec - 1);
    drawFern(p2x, p2y, m3 * h, psi - side * (phi3 - phi0 + (random ? randomDeviation() : 0)), side, rec - 1);
}

function randomDeviation() {
    return deviation * (Math.random() - 0.5) * Math.PI / 180;
}

function resetParams() {
    $('#n').val(10);
    $('#deviation').val(10);
    $('#color').val('#00AA00');
}

function fractalRedraw() {
    getParams();
    drawFractal();
}

function getParams() {
    //reset errors
    $('#errors').children().remove();

    n = getParam('#n', 'N', 10, true);
    res_color = $('#color').val();
    random = $('#random:checked').length !== 0;
    deviation = getParam('#deviation', 'Отклонение', 10);
}
