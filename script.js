// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the start button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    // Add event listener to the restart button
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);
});

function startGame() {
    // Hide the main menu
    const mainMenu = document.getElementById('main-menu');
    mainMenu.style.display = 'none';

    // Display the game screen
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'block';

    // Initialize the game and player
    new Player(); // Instantiate the Player class
    new Game(); // Instantiate the Game class
}

function restartGame() {
    // Hide the game-over screen
    const gameEnd = document.getElementById('game-end');
    gameEnd.style.display = 'none';

    // Reset lives and score
    document.getElementById('lives').innerText = 3;
    document.getElementById('score').innerText = 0;

    // Remove existing obstacles from the game screen
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());

    // Display the game screen
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'block';

    // Initialize the game
    new Game(); // Instantiate the Game class
}