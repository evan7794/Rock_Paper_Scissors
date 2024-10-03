const startGameBtn = document.getElementById('startGame');
const welcomeCard = document.getElementById('welcomeCard');

window.onload = function () {
    welcomeCard.classList.add('fade-in');
}

startGameBtn.addEventListener('click', () => {
    window.location.href = 'game.html'; 
});
