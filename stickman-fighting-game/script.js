const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player1 = {
    x: 100,
    y: 300,
    width: 50,
    height: 100,
    color: 'blue',
    dx: 0,
    dy: 0,
    speed: 5,
    jumping: false,
    attacking: false,
    health: 100
};

let opponent = {
    x: 700,
    y: 300,
    width: 50,
    height: 100,
    color: 'red',
    dx: 0,
    dy: 0,
    speed: 5,
    health: 100
};

// Game loop
function gameLoop() {
    update();
    draw();

    if (player1.health <= 0 || opponent.health <= 0) {
        // Game over
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
    } else {
        requestAnimationFrame(gameLoop);
    }
}

function update() {
    // Player 1 movement
    player1.x += player1.dx;
    player1.y += player1.dy;

// Gravity
if (player1.y < 300) {
    player1.dy += 1;
} else {
    player1.dy = 0;
    player1.y = 300;
    player1.jumping = false;
}

// Opponent AI
if (opponent.x < player1.x) {
    opponent.dx = opponent.speed;
} else if (opponent.x > player1.x) {
    opponent.dx = -opponent.speed;
}

opponent.x += opponent.dx;

// Player attack collision
if (player1.attacking &&
    player1.x + 30 < opponent.x + opponent.width &&
    player1.x + 30 + 30 > opponent.x &&
    player1.y - 40 < opponent.y + opponent.height &&
    player1.y - 40 + 10 > opponent.y) {
    opponent.health -= 10;
    player1.attacking = false;
}
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw stickman
function drawStickman(x, y, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;

    // Head
    ctx.beginPath();
    ctx.arc(x, y - 80, 20, 0, Math.PI * 2);
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(x, y - 60);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(x - 30, y - 40);
    ctx.lineTo(x + 30, y - 40);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 20, y + 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y + 40);
    ctx.stroke();
}

    // Draw player 1
drawStickman(player1.x, player1.y, player1.color);
if (player1.attacking) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(player1.x + 30, player1.y - 40, 30, 10);
}

// Draw opponent
drawStickman(opponent.x, opponent.y, opponent.color);

// Draw health bars
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, player1.health * 2, 20);
ctx.fillStyle = 'blue';
ctx.fillRect(canvas.width - 210, 10, opponent.health * 2, 20);
}

// Keyboard event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        player1.dx = -player1.speed;
    } else if (e.key === 'ArrowRight') {
        player1.dx = player1.speed;
    } else if (e.key === 'ArrowUp' && !player1.jumping) {
        player1.dy = -20;
        player1.jumping = true;
    } else if (e.key === ' ') {
        player1.attacking = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player1.dx = 0;
    } else if (e.key === ' ') {
        player1.attacking = false;
    }
});

const restartButton = document.getElementById('restartButton');

restartButton.addEventListener('click', () => {
    player1.health = 100;
    opponent.health = 100;
    player1.x = 100;
    player1.y = 300;
    opponent.x = 700;
    opponent.y = 300;
    gameLoop();
});

// Start the game loop
gameLoop();
