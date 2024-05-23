// Adicionar um Event Listener 
document.addEventListener("DOMContentLoaded", function() {
    // Esconder a tela de end-game inicialmente
    const gameEnd = document.getElementById('game-end');
    gameEnd.style.display = 'none';

    // Adicionar um Event Listener ao botão de start
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    // Adicionar um Event Listener ao botão de restart
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);

    // Adicionar um Event Listener ao botão de mute
    const muteButton = document.getElementById('mute-button');
    muteButton.addEventListener('click', toggleMute);
});

// Função para iniciar o jogo
function startGame() {
    // Parar a música do menu principal e tocar a música da tela do jogo
    document.getElementById('main-menu-music').pause();
    document.getElementById('game-screen-music').play();

    // Esconder o menu principal
    const mainMenu = document.getElementById('main-menu');
    mainMenu.style.display = 'none';

    // Exibir o game-screen
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'block';

    // Iniciar o jogo e o jogador
    new Player(); // instance player class
    new Game(); // instance game class
}

// Função para reiniciar o jogo
function restartGame() {
    // Parar a música do game-screen e play música do menu principal
    document.getElementById('game-screen-music').pause();
    document.getElementById('main-menu-music').play();

    // Esconder a tela do end-game
    const gameEnd = document.getElementById('game-end');
    gameEnd.style.display = 'none';

    // Reset vidas e pontuação
    document.getElementById('lives').innerText = 3;
    document.getElementById('score').innerText = 0;

    // Remover obstáculos do game-screen
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());

    // Exibir o game-screen
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'block';

    // Inicializar o jogo
    new Game(); // Instance game class
}

// Função para alternar o mute
function toggleMute() {
    const mainMenuMusic = document.getElementById('main-menu-music');
    const gameScreenMusic = document.getElementById('game-screen-music');
    
    // Alternar o mute para ambas as músicas
    if (mainMenuMusic.paused && gameScreenMusic.paused) {
        mainMenuMusic.play();
        gameScreenMusic.play();
    } else {
        mainMenuMusic.pause();
        gameScreenMusic.pause();
    }
}