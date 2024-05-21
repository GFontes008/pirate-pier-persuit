// Classe que representa um obstáculo
class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.element = document.createElement('div');
        this.element.style.backgroundImage = "url('./assets/cannonball.png')"
        this.element.className = 'obstacle';
        this.element.style.backgroundSize = 'contain'; // Isto assegura que a background image é resized to fit nas dimensoes do obstaculo sem o fazer cortar ou esticar
        this.gameScreen.appendChild(this.element);

        // Define a posição inicial e tamanho do obstáculo
        this.element.style.position = 'absolute';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.top = `${Math.random() * (gameScreen.clientHeight - 50)}px`;
        this.element.style.left = `${gameScreen.clientWidth}px`;
        this.speed = 3; // Velocidade do obstáculo
    }

    // Função que move o obstáculo
    move() {
        this.element.style.left = `${this.element.offsetLeft - this.speed}px`;
    }

    // Função para remover o obstáculo quando sai da tela
    remove() {
        return this.element.offsetLeft < -50;
    }
}