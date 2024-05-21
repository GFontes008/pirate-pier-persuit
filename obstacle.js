// obstacle.js

class Obstacle {
    constructor() {
        // Create a new obstacle element
        this.element = document.createElement('img');
        this.element.src = './assets/cannonball.png'; // Replace with your obstacle image path
        this.element.classList.add('obstacle');
        
        // Set initial position
        this.x = window.innerWidth; // Start at the right edge
        this.y = Math.random() * (window.innerHeight - 50); // Random vertical position, adjust height as needed

        // Set initial styles
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.width = '75px'; // Adjust width as needed
        this.element.style.height = 'auto'; // Maintain aspect ratio
        this.speed = 5; // Adjust speed as needed

        // Add the obstacle to the game screen
        document.getElementById('game-screen').appendChild(this.element);
    }

    move() {
        // Move the obstacle to the left
        this.x -= this.speed;
        this.element.style.left = `${this.x}px`;
    }

    isOffScreen() {
        // Check if the obstacle is off the screen
        return this.x + this.element.offsetWidth < 0;
    }
}