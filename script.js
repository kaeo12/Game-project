let score = 0;

function cook() {
    score++;
    updateScore();
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
}
