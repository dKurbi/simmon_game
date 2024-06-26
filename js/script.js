// script.js
const maxL = 15; // Máximo nivel posible
let level = 0;
let sequence = [];
let playerSequence = [];

const startButton = document.getElementById('start-button');
const levelInput = document.getElementById('level-input');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalButton = document.getElementById('modal-button');
const colorButtons = document.querySelectorAll('.color-button');
const messageElement = document.getElementById('message');



startButton.addEventListener('click', startGame);
modalButton.addEventListener('click', closeModal);

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        playerSequence.push(color);
        flashButton(color, baseTime / 2); // Iluminar el botón también al presionar
        checkPlayerMove();
    });
});

function getRandomColor() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
}
function startGame() {
	maxLevel = parseInt(levelInput.value);
	if (maxLevel < 2 || maxLevel > maxLevel) {
        alert(`Por favor, selecciona un número entre 2 y ${maxL}.`);
        return;
    }
	sequence = [];
    playerSequence = [];
    messageElement.textContent = 'Starting';
    baseTime = 600;  // Reinicia el tiempo base al comenzar un nuevo juego
    nextRound();
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
        youLose();
        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function nextRound() {
    if (level >= maxLevel) {
		youWin();
        return;
    }
    playerSequence = [];
    level++;
    messageElement.textContent = `Level ${level}`;
    const nextColor = getRandomColor();
    sequence.push(nextColor);
    playSequence();
}

function youWin() {
	modalMessage.textContent = 'You Win!!! Congratulations!!';
	messageElement.textContent = 'You Win!!! Congratulations!!';
	openModal();
}
function youLose() {        
	modalMessage.textContent = 'Game Over! Try Again!';
	messageElement.textContent = 'Game Over! Try Again!';
	openModal();
	return;
}
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    resetGame();
}

function resetGame() {
    level = 0;
    sequence = [];
    playerSequence = [];
    baseTime = 600;
    messageElement.textContent = '';
}
