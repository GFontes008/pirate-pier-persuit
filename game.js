class Game {
    constructor() {
        // Array to store obstacle objects
        this.obstacles = [];

        // Player lives
        this.lives = 3;

        // Player score
        this.score = 0;

        // Maximum score to end the game
        this.maxScore = 250;
        
        // Keep track of the final score
        this.finalScore = 0;

        // Interval for spawning obstacles
        this.obstacleSpawnInterval = 2000; // Adjust as needed
        this.obstacleIntervalId = setInterval(this.spawnObstacle.bind(this), this.obstacleSpawnInterval);

        // Start the game loop
        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }

    spawnObstacle() {
        // Create a new obstacle object
        const obstacle = new Obstacle();
        // Add the obstacle to the array
        this.obstacles.push(obstacle);
    }

    updateObstacles() {
        // Update obstacles position and check for collision or off-screen
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.move();
            if (this.checkCollision(obstacle)) {
                // Handle collision
                this.lives -= 1;
                document.getElementById('lives').innerText = this.lives;
                obstacle.element.remove();
                if (this.lives <= 0) {
                    this.endGame();
                }
                return false;
            }
            if (obstacle.isOffScreen()) {
                // Increase score by 10 when the obstacle moves off-screen
                this.score += 10;  
                this.finalScore = this.score;
                document.getElementById('score').innerText = this.score;
                obstacle.element.remove();
                
                // Check if the score has reached the maximum score
                if (this.score >= this.maxScore) {
                    this.endGame();
                }

                return false; // Remove from array
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
        // Hide the game screen
        document.getElementById('game-screen').style.display = 'none';

        // Show the game-over screen
        const gameEnd = document.getElementById('game-end');
        gameEnd.style.display = 'flex';
        document.getElementById('end-message').innerText = this.lives <= 0 ? 
            `The sands got you this time, maybe some rum will help next time! Your score: ${this.score}.` : 
            `Good Captain, you've managed to catch up with your crew! Your score: ${this.maxScore}.`;

        // Stop spawning obstacles
        clearInterval(this.obstacleIntervalId);

        // Cancel the game loop
        cancelAnimationFrame(this.gameLoopId);
    }

    gameLoop() {
        // Update obstacles
        this.updateObstacles();
        
        // Request the next frame
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }
}

// Initialize the game when the game starts
document.addEventListener("DOMContentLoaded", function() {
    const game = new Game();
});