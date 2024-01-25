const gameArea = document.getElementById('gameArea');
const gameOverElement = document.getElementById('gameOver');
const scoreElement = document.getElementById('currentScore'); // Score display element
const gameSize = 400;
const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let food = { x: gridSize * 10, y: gridSize * 10 };
let velocity = { x: 0, y: 0 };
let score = 0;
let gameIsOver = false;

function update() {
    if (gameIsOver) return;

    let head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        updateScoreDisplay(); // Update score display
        food = {
            x: Math.floor(Math.random() * (gameSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (gameSize / gridSize)) * gridSize
        };
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= gameSize || head.y < 0 || head.y >= gameSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
    } else {
        draw();
    }
}

function draw() {
    gameArea.innerHTML = '';
    snake.forEach((segment, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.left = segment.x + 'px';
        snakeElement.style.top = segment.y + 'px';
        snakeElement.classList.add(index === 0 ? 'snake-head' : 'snake');
        gameArea.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

function gameOver() {
    gameOverElement.style.display = 'block';
    document.getElementById('score').innerText = score;
    gameIsOver = true;
}

function restartGame() {
    gameIsOver = false;
    gameOverElement.style.display = 'none';
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    velocity = { x: 0, y: 0 };
    score = 0; // Reset score
    updateScoreDisplay(); // Update score display
}

function updateScoreDisplay() {
    scoreElement.innerText = score; // Update score text
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (gameIsOver) restartGame();
            velocity = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (gameIsOver) restartGame();
            velocity = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (gameIsOver) restartGame();
            velocity = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (gameIsOver) restartGame();
            velocity = { x: gridSize, y: 0 };
            break;
    }
});

document.getElementById('restartButton').addEventListener('click', restartGame);

setInterval(update, 200);
