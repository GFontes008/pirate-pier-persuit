class Obstacle {
    constructor(gameScreen, position) {
        this.gameScreen = gameScreen; // Reference to the game screen element
        this.element = document.createElement('div'); // Create a div element for the obstacle
        this.element.classList.add('obstacle'); // Add the 'obstacle' class to the obstacle element
        this.element.classList.add(position === 'top' ? 'obstacle-top' : 'obstacle-bottom'); // Add the corresponding position class
        this.gameScreen.appendChild(this.element); // Append the obstacle element to the game screen

        // Set initial position based on top or bottom
        if (position === 'top') {
            this.element.style.top = '0'; // Position at the top of the screen
        } else if (position === 'bottom') {
            this.element.style.bottom = '0'; // Position at the bottom of the screen
        }

        // Set initial horizontal position (outside the screen)
        this.element.style.left = `${this.gameScreen.clientWidth}px`;

        // Set obstacle speed
        this.speed = 3; // Adjust as needed
    }

    // Method to move the obstacle
    move() {
        this.element.style.left = `${this.element.offsetLeft - this.speed}px`; // Move the obstacle to the left
    }

    // Method to check if the obstacle is out of the screen
    remove() {
        const screenLeftEdge = 0; // Define the left edge of the screen
        return this.element.offsetLeft < screenLeftEdge; // Return true if the obstacle has moved out of the screen
    }
}