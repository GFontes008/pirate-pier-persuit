class Player {
    constructor() {
        // Get player element from the DOM
        this.playerElement = document.getElementById('player');

        // Initial position of the player
        this.x = 50; // Adjust as needed
        this.y = 200; // Adjust as needed
        this.speed = 10; // Adjust movement speed as needed

        // Bind the context of the handleKeyDown function to the Player instance
        this.handleKeyDown = this.handleKeyDown.bind(this);
        // Add event listener for keydown event
        document.addEventListener('keydown', this.handleKeyDown);

        // Initial rendering of the player's position
        this.updatePosition();
    }

    handleKeyDown(event) {
        // Get the code of the pressed key
        const keyCode = event.keyCode;

        // Move the player up if the Up arrow key is pressed
        if (keyCode === 38) { // Up arrow key
            this.y = Math.max(0, this.y - this.speed); // Prevent moving out of the screen
        }
        // Move the player down if the Down arrow key is pressed
        else if (keyCode === 40) { // Down arrow key
            this.y = Math.min(window.innerHeight - this.playerElement.offsetHeight, this.y + this.speed); // Prevent moving out of the screen
        }

        // Update player's position
        this.updatePosition();
    }

    updatePosition() {
        // Update the position of the player element on the screen
        this.playerElement.style.top = this.y + 'px';
    }
}

// Initialize the player when the game starts
document.addEventListener("DOMContentLoaded", function() {
    const player = new Player();
});