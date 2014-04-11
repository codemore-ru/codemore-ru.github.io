
var canvas, context;
var balls = [];

window.onload = function(){
    canvas = document.getElementById('drawingCanvas');
    context = canvas.getContext('2d');

    //bind events
    document.getElementById('newBall').onclick = addBall;
    document.getElementById('clearCanvas').onclick = clearBalls;

    //start animation
    setTimeout(drawFrame, 20);
};

function random(min, max) {
    return Math.round(Math.random() * (max - min - 1) + min);
}

function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    //pick random color
    var colors = ['green', 'orange', 'blue', 'red', 'yellow', 'magenta', 'brown', 'purple', 'pink'];
    this.color = colors[random(0, colors.length)];
}

function addBall() {
    var radius = random(20, 50);
    var ball = new Ball(
        random(radius, canvas.width - radius),
        random(radius, canvas.height - radius),
        random(-10, 10),
        random(-10, 10),
        radius
    );
    balls.push(ball);
}

function clearBalls() {
    balls = [];
}

function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ball.x += ball.dx;
        ball.y += ball.dy;

        if(ball.y < canvas.height) {
            ball.dy += 0.22;
        }

        ball.dx *= 0.998;

        if((ball.x + ball.radius > canvas.width) ||
           (ball.x - ball.radius < 0)
          ) {
            ball.dx = -ball.dx;
        }

        if((ball.y + ball.radius > canvas.height) ||
           (ball.y - ball.radius < 0)
          ) {
            ball.dy = -ball.dy * 0.96;
        }

        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = ball.color;
        context.lineWidth = 1;
        context.fill();
        context.stroke();
    }
    setTimeout(drawFrame, 20);
}