class Obstacle {
    constructor() {
        // Criar um novo obstáculo
        this.element = document.createElement('img');
        this.element.src = './assets/cannonball.png'; //imagem do obstáculo
        this.element.classList.add('obstacle');
        
        // Definir posição inicial
        this.x = window.innerWidth; // Começa na margem direita
        this.y = Math.random() * (window.innerHeight - 50); // Posição vertical aleatória, ajuste a altura conforme necessário

        // Define estilos 
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.width = '75px'; //largura 
        this.element.style.height = 'auto'; // Manter a proporção
        this.speed = 20; // Aumentar a velocidade

        // Adicionar o obstáculo
        document.getElementById('game-screen').appendChild(this.element);
    }

    move() {
        // Move o obstáculo para a esquerda
        this.x -= this.speed;
        this.element.style.left = `${this.x}px`;
    }

    isOffScreen() {
        // Verifica se o obstáculo está fora da tela
        return this.x + this.element.offsetWidth < 0;
    }
}