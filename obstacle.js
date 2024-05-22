class Obstacle {
    constructor() {
        // Criar um novo elemento obstáculo
        this.element = document.createElement('img');
        this.element.src = './assets/cannonball.png'; // Substitua pelo caminho da imagem do seu obstáculo
        this.element.classList.add('obstacle');
        
        // Definir posição inicial
        this.x = window.innerWidth; // Começa na borda direita
        this.y = Math.random() * (window.innerHeight - 50); // Posição vertical aleatória, ajuste a altura conforme necessário

        // Definir estilos iniciais
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.width = '75px'; // Ajuste a largura conforme necessário
        this.element.style.height = 'auto'; // Manter a proporção
        this.speed = 10; // Aumentar a velocidade

        // Adicionar o obstáculo à tela do jogo
        document.getElementById('game-screen').appendChild(this.element);
    }

    move() {
        // Mover o obstáculo para a esquerda
        this.x -= this.speed;
        this.element.style.left = `${this.x}px`;
    }

    isOffScreen() {
        // Verificar se o obstáculo está fora da tela
        return this.x + this.element.offsetWidth < 0;
    }
}