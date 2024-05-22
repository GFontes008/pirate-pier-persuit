class Player {
    constructor() {
        // Obter o elemento do jogador do DOM
        this.playerElement = document.getElementById('player');

        // Posição inicial do jogador
        this.x = 50; // Ajustar conforme necessário
        this.y = 200; // Ajustar conforme necessário
        this.speed = 10; // Ajustar velocidade de movimento conforme necessário

        // Vincular o contexto da função handleKeyDown à instância de Player
        this.handleKeyDown = this.handleKeyDown.bind(this);
        // Adicionar um ouvinte de evento para o evento de pressionar uma tecla
        document.addEventListener('keydown', this.handleKeyDown);

        // Renderização inicial da posição do jogador
        this.updatePosition();
    }

    handleKeyDown(event) {
        // Obter o código da tecla pressionada
        const keyCode = event.keyCode;

        // Mover o jogador para cima se a tecla de seta para cima for pressionada
        if (keyCode === 38) { // Tecla de seta para cima
            this.y = Math.max(0, this.y - this.speed); // Impedir que saia da tela
        }
        // Mover o jogador para baixo se a tecla de seta para baixo for pressionada
        else if (keyCode === 40) { // Tecla de seta para baixo
            this.y = Math.min(window.innerHeight - this.playerElement.offsetHeight, this.y + this.speed); // Impedir que saia da tela
        }

        // Atualizar a posição do jogador
        this.updatePosition();
    }

    updatePosition() {
        // Atualizar a posição do elemento do jogador na tela
        this.playerElement.style.top = this.y + 'px';
    }
}

// Inicializar o jogador quando o jogo começa
document.addEventListener("DOMContentLoaded", function() {
    const player = new Player();
});