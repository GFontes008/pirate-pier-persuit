


//This game class is responsable for handling all the game behavior
//A class é para criar uma serie of Diferent Objects

class Game {
    constructor(){
        this.startScreen = document.getElementById('main-menu');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = null;
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.isGameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60;
    }
     
//com o Constructor definido agora posso, (dentro da clss'Game' começar a fazer 'methods' (function...))

start(){ // sempre que call the START method, set the sizes, esconde o StartScreen e mostra o GameScreen
    this.gameScreen.style.height = '${this.height}px'
    this.gameScreen.style.width = '${this.width}px'
    this.startScreen.style.display='none'  
    this.startScreen.style.display='block' 

    this.gameIntervalId = setInterval(()=>{  // SetInterval How often queremos chamar esta função
this.gameLoop()
    },this.gameLoopFrequency) 
}

gameLoop(){
this.update()
if(this.isGameOver){
    clearInterval(this.gameIntervalId)
}
}

update(){

}
}