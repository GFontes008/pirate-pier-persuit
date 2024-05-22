document.addEventListener("DOMContentLoaded", function() {
    // Hide the game-end screen initially
    const gameEnd = document.getElementById('game-end');
    gameEnd.style.display = 'none';

    // Add event listener to the start button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    // Add event listener to the restart button
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);

    // Add event listener to the mute button
    const muteButton = document.getElementById('mute-button');
    muteButton.addEventListener('click', toggleMute);
});

function startGame() {
    // Stop main menu music and play game screen music
    document.getElementById('main-menu-music').pause();
    document.getElementById('game-screen-music').play();

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
    // Stop game screen music and play main menu music
    document.getElementById('game-screen-music').pause();
    document.getElementById('main-menu-music').play();

    // Hide the game-end screen
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

function toggleMute() {
    const mainMenuMusic = document.getElementById('main-menu-music');
    const gameScreenMusic = document.getElementById('game-screen-music');
    
    // Toggle mute for both music tracks
    if (mainMenuMusic.paused && gameScreenMusic.paused) {
        mainMenuMusic.play();
        gameScreenMusic.play();
    } else {
        mainMenuMusic.pause();
        gameScreenMusic.pause();
    }
}