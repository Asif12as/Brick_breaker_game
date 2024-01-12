const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const scoreElement = document.getElementById('scoreValue');
const gameOverPopup = document.getElementById('gameOverPopup');

// Define the paddle properties
const paddleWidth = 80;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Define the ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Paddle controls
let rightPressed = false;
let leftPressed = false;

// Game state
let gameOver = false;
let score = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    scoreElement.textContent = score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
    drawScore();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Ball-wall collision
    if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            score++;
        } else {
            gameOver = true;
            gameOverPopup.style.display = 'block';
        }
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (!gameOver) {
        requestAnimationFrame(draw);
    } else {
        restartButton.style.display = 'block';
    }
}

function restartGame() {
    gameOver = false;
    score = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballSpeedX = 2;
    ballSpeedY = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    restartButton.style.display = 'none';
    gameOverPopup.style.display = 'none';
    draw();
}

restartButton.addEventListener('click', restartGame);

draw();

