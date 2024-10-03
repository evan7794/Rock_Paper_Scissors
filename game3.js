const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '🗿', paper: '📄', scissors: '✂️' };
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const resultElement = document.getElementById('result');
const choicesElement = document.getElementById('choices');
const resetBtn = document.getElementById('resetBtn');
const choiceBtns = document.querySelectorAll('.choice-btn');

function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) return 'player';
    return 'computer';
}

function updateScore(winner) {
    if (winner === 'player') playerScore++;
    if (winner === 'computer') computerScore++;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function displayResult(playerChoice, computerChoice, winner) {
    let resultText = winner === 'tie' ? "It's a tie!" : winner === 'player' ? "You win!" : "Computer wins!";
    resultElement.textContent = resultText;
    choicesElement.textContent = `You chose ${emojis[playerChoice]} vs Computer's ${emojis[computerChoice]}`;
}

function checkGameOver() {
    if (playerScore >= 5 || computerScore >= 5) {
        gameOver = true;
        choiceBtns.forEach(btn => btn.disabled = true);
        createConfetti();
    }
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        confettiContainer.appendChild(confetti);
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultElement.textContent = '';
    choicesElement.textContent = '';
    choiceBtns.forEach(btn => btn.disabled = false);
    document.getElementById('confetti').innerHTML = '';
}

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (gameOver) return;
        const playerChoice = btn.getAttribute('data-choice');
        const computerChoice = computerPlay();
        const winner = determineWinner(playerChoice, computerChoice);
        updateScore(winner);
        displayResult(playerChoice, computerChoice, winner);
        checkGameOver();
    });
});

resetBtn.addEventListener('click', resetGame);
