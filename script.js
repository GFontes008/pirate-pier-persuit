// Adicionar um ouvinte de evento para quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    // Esconder a tela de fim de jogo inicialmente
    const gameEnd = document.getElementById('game-end');
    gameEnd.style.display = 'none';

    // Adicionar um ouvinte de evento ao botão de iniciar
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    // Adicionar um ouvinte de evento ao botão de reiniciar
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame);

    // Adicionar um ouvinte de evento ao botão de mutar
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

    // Exibir a tela do jogo
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'block';

    // Inicializar o jogo e o jogador
    new Player(); // Instanciar a classe Player
    new Game(); // Instanciar a classe Game
}

// Função para reiniciar o jogo
function restartGame() {
    // Parar a música da tela do jogo e tocar a música do menu principal
    document.getElementById('game-screen-music').pause();
    document.getElementById('main-menu-music').play();

    // Esconder a tela de fim de jogo
    const gameEnd = document.getElementById('game-end');
    gameEnd.style.display = 'none';

    // Resetar vidas e pontuação
    document.getElementById('lives').innerText = 3;
    document.getElementById('score').innerText = 0;

    // Remover obstáculos existentes da tela do jogo
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());

    // Exibir a tela do jogo
    const gameScreen = document.getElementById('game-screen');
    gameScreen.style.display = 'block';

    // Inicializar o jogo
    new Game(); // Instanciar a classe Game
}

// Função para alternar o mudo
function toggleMute() {
    const mainMenuMusic = document.getElementById('main-menu-music');
    const gameScreenMusic = document.getElementById('game-screen-music');
    
    // Alternar o mudo para ambas as faixas de música
    if (mainMenuMusic.paused && gameScreenMusic.paused) {
        mainMenuMusic.play();
        gameScreenMusic.play();
    } else {
        mainMenuMusic.pause();
        gameScreenMusic.pause();
    }
}