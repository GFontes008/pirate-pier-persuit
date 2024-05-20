// Classe que representa o jogador
class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.element = document.getElementById('player');
        this.speed = 5; // Define a velocidade do jogador
        this.moveUp = false;
        this.moveDown = false;

        // eventListener para as teclas
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    // Função para a tecla pressionada
    handleKeyDown(event) {
        if (event.key === 'ArrowUp') {
            this.moveUp = true;
        }
        if (event.key === 'ArrowDown') {
            this.moveDown = true;
        }
    }

    // Função para a tecla solta
    handleKeyUp(event) {
        if (event.key === 'ArrowUp') {
            this.moveUp = false;
        }
        if (event.key === 'ArrowDown') {
            this.moveDown = false;
        }
    }

    // Função que move o jogador
    move() {
        const gameScreenHeight = this.gameScreen.clientHeight;
        const playerHeight = this.element.clientHeight;

        // Move o jogador para cima
        if (this.moveUp) {
            this.element.style.top = `${Math.max(0, this.element.offsetTop - this.speed)}px`;
        }

        // Move o jogador para baixo
        if (this.moveDown) {
            this.element.style.top = `${Math.min(gameScreenHeight - playerHeight, this.element.offsetTop + this.speed)}px`;
        }
    }
}