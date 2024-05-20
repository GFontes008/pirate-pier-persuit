window.onload = function(){
const startButton = document.getElementById('startbutton')
const restartButton = document.getElementById('restart-button')

const ourGame = new Game()
startButton.addEventListener('click', function(){
    startGame();

});function startGame(){
ourGame.start();
}
}