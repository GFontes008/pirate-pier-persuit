// Classe que representa o jogo
class Game {
    constructor() {
        this.startScreen = document.getElementById('main-menu');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = null;
        this.height = window.innerHeight; // Define a altura para a janela
        this.width = window.innerWidth; // Define a largura para a janela
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000 / 60;
        this.backgroundX = 0;
    }

    // Função que inicia o jogo
    start() {
        // Define os tamanhos do ecrã do jogo
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        // Esconde o ecrã inicial
        this.startScreen.style.display = 'none';

        // Mostra o ecrã do jogo
        this.gameScreen.style.display = 'block';

        // Instance do jogador
        this.player = new Player(this.gameScreen);

        // Configura o intervalo do loop do jogo
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

    // Loop do jogo
    gameLoop() {
        this.update();
        if (this.isGameOver) {
            clearInterval(this.gameIntervalId);
        }
    }

    // Atualizações do jogo
    update() {
        // Atualiza a posição do jogador
        if (this.player) {
            this.player.move();
        }

        // Move o background
        this.backgroundX -= 2; // Ajusta a velocidade conforme necessário
        this.gameScreen.style.backgroundPosition = `${this.backgroundX}px 0`;
    }
}