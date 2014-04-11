/**
 * Created by NurgalievAT on 06.04.14.
 */

var canvas, context;
var circles = [];
var previousSelectedCircle = null;

window.onload = function(){
    canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');

    //bind actions
    document.getElementById('newCircle').onclick = addRandomCircle;
    document.getElementById('clearCanvas').onclick = clearCanvas;
    canvas.onclick = canvasClick;
};

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;
}

//returns a random number from interval [min;max)
function random(min, max) {
    return Math.round(Math.random() * (max - min - 1) + min);
}

function addRandomCircle() {
    var radius = random(10, 60);
    var x = random(0, canvas.width);
    var y = random(0, canvas.height);
    var colors = ['green', 'orange', 'blue', 'red', 'yellow', 'magenta', 'brown', 'purple', 'pink'];
    var color = colors[random(0, colors.length)];

    var circle = new Circle(x, y, radius, color);
    circles.push(circle);

    drawCircles();
}

function drawCircles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.85;
    context.strokeStyle = 'black';

    for(var i = 0; i < circles.length; i++) {
        var circle = circles[i];

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        context.fillStyle = circle.color;
        if(circle.isSelected) {
            context.lineWidth = 5;
        }else{
            context.lineWidth = 1;
        }
        context.fill();
        context.stroke();
    }
}

function clearCanvas() {
    circles = [];
    previousSelectedCircle = null;
    drawCircles();
}

function canvasClick(e) {
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;

    for(var i = circles.length - 1; i >= 0; i--) {
        var circle = circles[i];
        var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));
        if(distanceFromCenter <= circle.radius) {
            if(previousSelectedCircle != null) {
                previousSelectedCircle.isSelected = false;
            }
            previousSelectedCircle = circle;
            circle.isSelected = true;

            drawCircles();
            return;
        }
    }
}