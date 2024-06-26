// script.js

let sequence = [];
let playerSequence = [];
let level = 0;

// Tiempo base en milisegundos
let baseTime = 600;
// Máximo de niveles
const maxLevel = 5;

const startButton = document.getElementById('start-button');
const messageElement = document.getElementById('message');
const colorButtons = document.querySelectorAll('.color-button');

startButton.addEventListener('click', startGame);

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        playerSequence.push(color);
        flashButton(color, baseTime / 2); // Iluminar el botón también al presionar
        checkPlayerMove();
    });
});

function startGame() {
    level = 0;
    sequence = [];
    playerSequence = [];
    messageElement.textContent = '';
    baseTime = 600;  // Reinicia el tiempo base al comenzar un nuevo juego
    nextRound();
}

function nextRound() {
    if (level >= maxLevel) {
        messageElement.textContent = 'You Win!!! Congratulations!!';
        setTimeout(()=>{
			resetGame();
		},3000);
		alert('You Win!!! Congratulations!');
        return;
    }
    playerSequence = [];
    level++;
    messageElement.textContent = `Level ${level}`;
    const nextColor = getRandomColor();
    sequence.push(nextColor);
    playSequence();
}

function resetGame() {
    level = 0;
    sequence = [];
    playerSequence = [];
    baseTime = 600;
    messageElement.textContent = '';
}

function getRandomColor() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function playSequence() {
    let delay = 0;
    const activationTime = baseTime / 2;  // El tiempo de activación es la mitad del tiempo base
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color, activationTime);
        }, delay);
        delay += baseTime;  // Usa el tiempo base para espaciar los botones en la secuencia
    });
    // Reduce el tiempo base en un 10% para el próximo nivel
    baseTime = Math.max(200, baseTime * 0.9);  // No reducir por debajo de 200 ms
}

function flashButton(color, activationTime) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, activationTime);
}

function checkPlayerMove() {
    const currentMoveIndex = playerSequence.length - 1;
    if (playerSequence[currentMoveIndex] !== sequence[currentMoveIndex]) {
        alert('Game Over! Try Again!');
		resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}
