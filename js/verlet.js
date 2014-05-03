/**
 * Created by NurgalievAT on 03.05.14.
 */
var canvas, ctx;
var mouseDrag = false;
var maxDistance = 10;
var pointId = -1;
var px, py;

var clearColor = 'white';
var lineColor = '#3366FF';

window.onload = function() {
    canvas = document.getElementById('drawing');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = clearColor;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = '1px';

    canvas.onmousedown = canvasMouseDown;
    canvas.onmousemove = canvasMouseMove;
    canvas.onmouseup = canvas.onmouseout = canvasMouseUp;

    //Verlet
    InitCloth();
    setInterval(Tick, 20);

    clearCanvas();
};

function Tick() {
    clearCanvas();
    var count = constraints.length;
    ctx.beginPath();
    for(var i = 0; i < count; i++) {
        if(constraints[i].pointA != -1 && constraints[i].pointB != -1) {
            ctx.moveTo(x[constraints[i].pointA].x, x[constraints[i].pointA].y);
            ctx.lineTo(x[constraints[i].pointB].x, x[constraints[i].pointB].y);
        }
    }
    ctx.stroke();
    TimeStep();
}

//physics

var x = [];
var old_x = [];
var constraints = [];
var a = [];

var gravity = {x: 0, y: 5};
var timeStep = 0.2;
var maxIterations = 2;
var meshStep = 15;
var meshWidth = 20;
var meshHeight = 20;
var tearDistance = 5;

function TimeStep() {
    AccumulateForces();
    Verlet();
    SatisfyConstraints();
}

function Verlet() {
    var count = x.length;
    var timeSquare = timeStep * timeStep;
    for(var i = 0; i < count; i++) {
        if(i == pointId) continue;
        var cur_x = x[i];
        var prev = {x: cur_x.x, y: cur_x.y};
        var oldx = old_x[i];
        var cur_a = a[i];
        cur_x.x += cur_x.x - oldx.x + cur_a.x * timeSquare;
        cur_x.y += cur_x.y - oldx.y + cur_a.y * timeSquare;
        old_x[i] = prev;
    }
}

function SatisfyConstraints() {
    for(var j = 0; j < maxIterations; j++) {
        for(var i = 0; i < x.length; i++) {
            var cur_x = x[i];
            cur_x.x = Math.min(Math.max(cur_x.x, 0), canvas.width);
            cur_x.y = Math.min(Math.max(cur_x.y, 0), canvas.height);
        }

        for(i = 0; i < constraints.length; i++) {
            if(constraints[i].pointA == -1 || constraints[i].pointB == -1) {
                continue;
            }
            var x1 = x[constraints[i].pointA];
            var x2 = x[constraints[i].pointB];
            var delta = {x: x2.x-x1.x, y: x2.y-x1.y};
            var deltalength = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
            var diff = (constraints[i].restlength - deltalength) / deltalength;

            //tear off
            if(Math.abs(deltalength) / meshStep > tearDistance) {
                constraints[i] = {pointA: -1, pointB: -1};
            }

            var dx = delta.x * 0.5 * diff;
            var dy = delta.y * 0.5 * diff;
            x1.x -= dx;
            x1.y -= dy;
            x2.x += dx;
            x2.y += dy;
        }
    }

    //fix top edge
    var xOffset = (canvas.width - meshWidth * meshStep) / 2;
    for(i = 0; i < meshHeight; i++) {
        x[i*meshWidth] = {x: xOffset + (i)*meshStep, y: 0};
    }

    //fix grabbed point
    if(pointId != -1) {
        x[pointId] = {x: px, y: py};
    }
}

function AccumulateForces() {
    var count = x.length;
    for(var i = 0; i < count; i++) {
        a[i] = gravity;
    }
}

function InitCloth() {
    var xOffset = (canvas.width - meshWidth * meshStep) / 2;
    for(var i = 0; i < meshWidth; i++) {
        for(var j = 0; j < meshHeight; j++) {
            var point = {
                x: xOffset + i*meshStep,
                y: j*meshStep
            };
            x.push(point);
            old_x.push(clone(point));
            //add constraints
            if(i < meshWidth-1) {
                constraints.push({
                    pointA: j*meshHeight + i,
                    pointB: j*meshHeight +i +1,
                    restlength: meshStep
                });
            }
            if(j < meshHeight - 1) {
                constraints.push({
                    pointA: j * meshHeight + i,
                    pointB: (j+1) * meshHeight + i,
                    restlength: meshStep
                });
            }
        }
    }
}

//mouse functions

function canvasMouseDown(e) {
    if(e.button === 0) {
        mouseDrag = true;
        pointId = -1;
        px = e.clientX - canvas.offsetLeft;
        py = e.clientY - canvas.offsetTop;
        for(var i = 0; i < x.length; i++) {
            var squareDistance = (x[i].x-px)*(x[i].x-px) + (x[i].y-py)*(x[i].y-py);
            if(squareDistance < maxDistance * maxDistance) {
                pointId = i;
                break;
            }
        }
    }
}

function canvasMouseMove(e) {
    if(mouseDrag) {
        px = e.clientX - canvas.offsetLeft;
        py = e.clientY - canvas.offsetTop;
    }
}

function canvasMouseUp(e) {
    mouseDrag = false;
    pointId = -1;
}

//utility

function Clone() {}

function clone(obj) {
    Clone.prototype = obj;
    return new Clone();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}