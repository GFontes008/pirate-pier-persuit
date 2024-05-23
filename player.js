class Player {
    constructor() {
       
        this.playerElement = document.getElementById('player');

        // Posição inicial do player
        this.x = 50; // Ajusta X
        this.y = 200; // Ajusta Y
        this.speed = 20; // Ajusta velocidade de movimento 

       
        this.handleKeyDown = this.handleKeyDown.bind(this);
        // Adiciona um Event listener ao pressionar uma tecla
        document.addEventListener('keydown', this.handleKeyDown);

        // Renderizar posição do player
        this.updatePosition();
    }

    handleKeyDown(event) {
        // Tecla pressionada
        const keyCode = event.keyCode;

        // Mover o jogador para cima se a tecla para cima for pressionada
        if (keyCode === 38) { // Tecla de seta cima
            this.y = Math.max(0, this.y - this.speed); // Impede que saia do ecrã
        }
        // Mover o jogador para baixo se a tecla para baixo for pressionada
        else if (keyCode === 40) { // Tecla de seta baixo
            this.y = Math.min(window.innerHeight - this.playerElement.offsetHeight, this.y + this.speed); // Impede que saia do ecrã
        }

        // Atualizar a posição do player
        this.updatePosition();
    }

    updatePosition() {
        // Atualizar a posição do player na tela
        this.playerElement.style.top = this.y + 'px';
    }
}

// Inicializa o player quando o jogo começa
document.addEventListener("DOMContentLoaded", function() {
    const player = new Player();
});