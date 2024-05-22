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
        this.obstacleSpawnInterval = 2000; // Ajustar conforme necessário
        this.obstacleIntervalId = setInterval(this.spawnObstacle.bind(this), this.obstacleSpawnInterval);

        // Iniciar o loop do jogo
        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoopId = requestAnimationFrame(this.gameLoop);

        // Inicializar o botão de mudo na tela do jogo
        this.initMuteButton();

        // Garantir que a música da tela do jogo comece a tocar
        document.getElementById('game-screen-music').play();
    }

    initMuteButton() {
        // Adicionar ouvinte de evento ao botão de mudo na tela do jogo
        const muteButtonGame = document.getElementById('mute-button-game');
        muteButtonGame.addEventListener('click', this.toggleMute.bind(this));
    }

    toggleMute() {
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

    spawnObstacle() {
        // Criar um novo objeto de obstáculo
        const obstacle = new Obstacle();
        // Adicionar o obstáculo ao array
        this.obstacles.push(obstacle);
        // Anexar o obstáculo à tela do jogo
        const gameScreen = document.getElementById('game-screen');
        gameScreen.appendChild(obstacle.element);
    }

    updateObstacles() {
        // Atualizar a posição dos obstáculos e verificar colisão ou fora da tela
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.move();
            if (this.checkCollision(obstacle)) {
                // Lidar com colisão
                this.lives -= 1;
                document.getElementById('lives').innerText = `Vidas: ${this.lives}`;
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
                document.getElementById('score').innerText = `Pontuação: ${this.score}`;
                obstacle.element.remove();

                // Verificar se a pontuação atingiu a pontuação máxima
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
        // Esconder a tela do jogo
        document.getElementById('game-screen').style.display = 'none';
    
        // Mostrar a tela de fim de jogo
        const gameEnd = document.getElementById('game-end');
        gameEnd.style.display = 'flex';
    
        // Mensagem padrão
        let endMessage = '';
    
        // Verificar se a pontuação é 250 ou se as vidas são zero
        if (this.score >= this.maxScore) {
            endMessage = `Bom Capitão, conseguiu alcançar sua tripulação! Sua pontuação: ${this.score}.`;
        } else if (this.lives <= 0) {
            endMessage = `As areias te pegaram desta vez, talvez um pouco de rum ajude na próxima vez! Sua pontuação: ${this.score}.`;
        }
    
        // Definir a mensagem de fim
        document.getElementById('end-message').innerText = endMessage;
    
        // Parar de gerar obstáculos
        clearInterval(this.obstacleIntervalId);
    
        // Cancelar o loop do jogo
        cancelAnimationFrame(this.gameLoopId);
    }

    gameLoop() {
        // Atualizar os obstáculos
        this.updateObstacles();

        // Solicitar o próximo frame
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }
}

// Inicializar o jogo quando o jogo começa
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