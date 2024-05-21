// game.js

class Game {
    constructor() {
        // Array to store obstacle objects
        this.obstacles = [];

        // Interval for spawning obstacles
        this.obstacleSpawnInterval = 2000; // Adjust as needed
        setInterval(this.spawnObstacle.bind(this), this.obstacleSpawnInterval);

        // Start the game loop
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }

    spawnObstacle() {
        // Create a new obstacle object
        const obstacle = new Obstacle();
        // Add the obstacle to the array
        this.obstacles.push(obstacle);
    }

    updateObstacles() {
        // Update obstacles position and check for off-screen
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.move();
            if (obstacle.isOffScreen()) {
                // Remove the obstacle element from the DOM
                obstacle.element.remove();
                return false; // Remove from array
            }
            return true;
        });
    }

    gameLoop() {
        // Update obstacles
        this.updateObstacles();
        
        // Request the next frame
        requestAnimationFrame(this.gameLoop);
    }
}

// Initialize the game when the game starts
document.addEventListener("DOMContentLoaded", function() {
    const game = new Game();
});