class Game {
    constructor() {
        // Array para armazenar objetos de obstáculos
        this.obstacles = [];

        // Vidas do jogador
        this.lives = 3;

        // Pontuação do jogador
        this.score = 0;

        // Pontuação máxima para terminar o jogo
        this.maxScore = 250;

        // Acompanhar a pontuação final
        this.finalScore = 0;

        // Intervalo para gerar obstáculos
        this.obstacleSpawnInterval = 2000; // <- Mudar intervalo 
        this.obstacleIntervalId = setInterval(this.spawnObstacle.bind(this), this.obstacleSpawnInterval);

        // Iniciar o loop do jogo
        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoopId = requestAnimationFrame(this.gameLoop);

        // Botão de Mute na tela do jogo
        this.initMuteButton();

        // Garantir que a música do game-screen começa
        document.getElementById('game-screen-music').play();
    }

    initMuteButton() {
        // Adiciona event listener ao botão de Mute no game-screen
        const muteButtonGame = document.getElementById('mute-button-game');
        muteButtonGame.addEventListener('click', this.toggleMute.bind(this));
    }

    toggleMute() {
        const mainMenuMusic = document.getElementById('main-menu-music');
        const gameScreenMusic = document.getElementById('game-screen-music');

        // Mute 
        if (mainMenuMusic.paused && gameScreenMusic.paused) {
            mainMenuMusic.play();
            gameScreenMusic.play();
        } else {
            mainMenuMusic.pause();
            gameScreenMusic.pause();
        }
    }

    spawnObstacle() {
        // Criar novo obstáculo
        const obstacle = new Obstacle();
        // Adicionar o obstáculo ao array
        this.obstacles.push(obstacle);
        // Anexar o obstáculo ao game-screen
        const gameScreen = document.getElementById('game-screen');
        gameScreen.appendChild(obstacle.element);
    }

    
    updateObstacles() {
        // Update a posiçao do obstaculo e verifica colisao e se o obstaculo esta
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.move();
            if (this.checkCollision(obstacle)) {

                // Se colidir
                this.lives -= 1;
                document.getElementById('lives').innerText = `Lives: ${this.lives}`;
                obstacle.element.remove();
                if (this.lives <= 0) {
                    this.endGame();
                }
                return false;
            }
            if (obstacle.isOffScreen()) {
                // Aumentar a pontuação em 10 quando o obstáculo sai da tela
                this.score += 10;
                this.finalScore = this.score;
                document.getElementById('score').innerText = `Score: ${this.score}`;
                obstacle.element.remove();

                // Verificar se Score atingiu o máximo
                if (this.score >= this.maxScore) {
                    this.endGame();
                }

                return false; // Remover do array
            }
            return true;
        });
    }

    checkCollision(obstacle) {
        const player = document.getElementById('player');
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        return !(
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.left > obstacleRect.right ||
            playerRect.right < obstacleRect.left
        );
    }

    endGame() {
        // Esconder game-screen
        document.getElementById('game-screen').style.display = 'none';
    
        // Mostrar a tela de end-game
        const gameEnd = document.getElementById('game-end');
        gameEnd.style.display = 'flex';
    
        // Mensagem 
        let endMessage = '';
    
        // Verificar se a pontuação é 250 ou se as vidas são zero 
        if (this.score >= this.maxScore) { 
            endMessage =`Well done Captain, you menage to find your crew! Your score: ${this.score}.`;
        } else if (this.lives <= 0) {
            endMessage =`The island got you this time! Maybe some rum will help next time. Your score: ${this.score}.`;
        }
    
        // Definir a end message
        document.getElementById('end-message').innerText = endMessage;
    
        // Parar de gerar obstáculos
        clearInterval(this.obstacleIntervalId);
    
        // Parar o loop do jogo
        cancelAnimationFrame(this.gameLoopId);
    }

    gameLoop() {
        // Atualizar os obstáculos
        this.updateObstacles();

        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }
}

// Inicializar o jogo
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        document.getElementById('main-menu-music').pause();
        new Game();
    });

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        document.getElementById('main-menu-music').play();
        new Game();
    });
});