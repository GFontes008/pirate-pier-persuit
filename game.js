// Classe que representa o jogo
class Game {
    constructor() {
        // Seleciona os elementos HTML necessários
        this.startScreen = document.getElementById('main-menu');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        // Inicialização de variáveis do jogo
        this.player = null;
        this.height = window.innerHeight;
        this.width = window.innerWidth;
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
        // Configura o tamanho do ecrã do jogo
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        // Esconde o ecrã inicial
        this.startScreen.style.display = 'none';
        // Mostra o ecrã do jogo
        this.gameScreen.style.display = 'block';

        // Cria o jogador
        this.player = new Player(this.gameScreen);

        // Reinicia o score e as vidas
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;

        // Atualiza a exibição do score e das vidas
        this.updateStats();

        // Configura o intervalo do loop do jogo
        this.gameIntervalId = setInterval(() => {
            this.gameLoop();
        }, this.gameLoopFrequency);
    }

    // Loop do jogo
    gameLoop() {
        // Atualiza o estado do jogo
        this.update();
        // Verifica se o jogo acabou
        if (this.isGameOver) {
            clearInterval(this.gameIntervalId);
            this.endGame();
        }
    }

    // Atualizações do jogo
    update() {
        // Move o jogador
        if (this.player) {
            this.player.move();
        }

        // Move o background
        this.backgroundX -= 30; // Ajusta a velocidade conforme necessário
        this.gameScreen.style.backgroundPosition = `${this.backgroundX}px 0`;

        // Atualiza a posição dos obstáculos
        this.obstacles.forEach((obstacle, index) => {
            obstacle.move();
            // Remove os obstáculos que saem do ecrã
            if (obstacle.remove()) {
                this.obstacles.splice(index, 1);
            }
            // Verifica colisão com o jogador
            if (this.checkCollision(this.player.element, obstacle.element)) {

                
                this.lives -= 1;
                if (this.lives <= 0) {
                    this.isGameOver = true;
                }

                // update as stats
                this.updateStats();
            } else if (obstacle.element.offsetLeft < this.player.element.offsetLeft) {
                // Incrementa o score quando um obstáculo passa o jogador
                this.score += 10;
                this.updateStats();
            }
        });

        // Cria novos obstáculos periodicamente
        if (Math.random() < 0.02) {
            this.createObstacle();
        }
    }

    // Função que verifica colisão entre dois elementos
    checkCollision(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    }

    // Função que cria um obstáculo
    createObstacle() {
        const obstaclePosition = Math.random() < 0.5 ? 'top' : 'bottom'; // Determina se posiciona o objeto no top ou bottom of the screen

         // Imagens top e bottom
    const obstacleImageUrl = obstaclePosition === 'top' ? './assets/cannonball.png' : './assets/crab.png';

        // cria um obstaculo na posiçao definida acima
        const obstacle = new Obstacle(this.gameScreen, obstaclePosition);
    this.obstacles.push(obstacle);
    }

    // Função que atualiza a exibição do score e das vidas
    updateStats() {
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
    }

    // Função que termina o jogo e mostra o ecrã final
    endGame() {
        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
        document.getElementById('end-message').innerText = "Game Over!";
    }
}