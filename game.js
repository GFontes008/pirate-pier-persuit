class Game {
    constructor() {
        // Array to store obstacle objects
        this.obstacles = [];

        // Player lives
        this.lives = 3;
        document.getElementById('lives').innerText = this.lives;

        // Player score
        this.score = 0;
        document.getElementById('score').innerText = this.score;

        // Maximum score to end the game
        this.maxScore = 250;

        // Track the final score
        this.finalScore = 0;

        // Interval to spawn obstacles
        this.obstacleSpawnInterval = 2000;
        this.obstacleIntervalId = setInterval(this.spawnObstacle.bind(this), this.obstacleSpawnInterval);

        // Start the game loop
        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoopId = requestAnimationFrame(this.gameLoop);

        // Mute button on the game screen
        this.initMuteButton();

        // Ensure the game screen music starts
        document.getElementById('game-screen-music').play();
    }

    initMuteButton() {
        // Add event listener to the mute button on the game screen
        const muteButtonGame = document.getElementById('mute-button-game');
        muteButtonGame.addEventListener('click', this.toggleMute.bind(this));
    }

    toggleMute() {
        const mainMenuMusic = document.getElementById('main-menu-music');
        const gameScreenMusic = document.getElementById('game-screen-music');

        // Mute 
        if (mainMenuMusic.paused && gameScreenMusic.paused) {
            mainMenuMusic.play();
            gameScreenMusic.play();
        } else {
            mainMenuMusic.pause();
            gameScreenMusic.pause();
        }
    }

    spawnObstacle() {
        // Create new obstacle
        const obstacle = new Obstacle();
        // Add the obstacle to the array
        this.obstacles.push(obstacle);
        // Attach the obstacle to the game screen
        const gameScreen = document.getElementById('game-screen');
        gameScreen.appendChild(obstacle.element);
    }

    updateObstacles() {
        // Update obstacle positions and check for collision and off-screen status
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.move();
            if (this.checkCollision(obstacle)) {
                // If collision
                this.lives -= 1;
                document.getElementById('lives').innerText = this.lives;
                obstacle.element.remove();
                if (this.lives <= 0) {
                    this.endGame();
                }
                return false;
            }
            if (obstacle.isOffScreen()) {
                // Increase the score by 10 when the obstacle goes off screen
                this.score += 10;
                this.finalScore = this.score;
                document.getElementById('score').innerText = this.score;

                // Check if score reached the maximum
                if (this.score >= this.maxScore) {
                    this.endGame();
                }

                obstacle.element.remove();
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
        // Hide game screen
        document.getElementById('game-screen').style.display = 'none';
    
        // Show the end-game screen
        const gameEnd = document.getElementById('game-end');
        gameEnd.style.display = 'flex';
    
        // End message
        let endMessage = '';
    
        // Check if the score is 250 or if lives are zero
        if (this.score >= this.maxScore) { 
            endMessage = `Well done Captain, you managed to find your crew! Your score: ${this.score}.`;
        } else if (this.lives <= 0) {
            endMessage = `The island got you this time! Maybe some rum will help next time. Your score: ${this.score}.`;
        }
    
        // Set the end message
        document.getElementById('end-message').innerText = endMessage;
    
        // Stop spawning obstacles
        clearInterval(this.obstacleIntervalId);
    
        // Stop the game loop
        cancelAnimationFrame(this.gameLoopId);
    }

    gameLoop() {
        // Update the obstacles
        this.updateObstacles();
        this.gameLoopId = requestAnimationFrame(this.gameLoop);
    }
}

// Initialize the game
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        document.getElementById('main-menu-music').pause();
        new Game();
    });

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        document.getElementById('main-menu-music').play();
        new Game();
    });
});