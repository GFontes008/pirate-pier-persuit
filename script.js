document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the start button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);
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
}