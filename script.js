window.onload = function() {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');

    //  Game onject INSTANCE
    const ourGame = new Game();

    // EventListener para o botão de Start
    startButton.addEventListener('click', function() {
        ourGame.start();
    });

    // EventListener para o botão Restart
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            ourGame.start();
        });
    }
};