window.onload = function(){
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');

    // Instantiate the Game object
    const ourGame = new Game();

    // Add event listener for the start button
    startButton.addEventListener('click', function(){
        document.getElementById('main-menu').style.display = 'none'; // Hide main menu
        document.getElementById('game-screen').style.display = 'block'; // Show game screen
        startGame(); // Call startGame function
    });


    // Function to start the game
    function startGame(){
        // Call the start method of the Game object
        ourGame.start();
    }
};