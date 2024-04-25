class Game {
  constructor() {
    // Game's properties and respectivelly values
    this.startScreen = document.getElementById("game-intro"); // Getting the Game intro div of HTML
    this.gameScreen = document.getElementById("game-screen"); // Getting the Game screen div of HTML
    this.gameEndScreen = document.getElementById("game-end"); // Getting the Game end div of HTML
    // this.player = null; ---- commented out due to being replaced by the construction of player
    this.height = 600; 
    this.width = 1000;
    this.obstacles = []; //Setting the empty array. In the future this will save the Objects (obstacles) that will be pushed
    this.score = 0;
    this.lives = 1;
    this.counter = 90 //This is the start counter that will be decreased by if statments on line 115. 
                      //This will set up the initial time between obstacles to appear on the screen 
    this.isRunning = false;
    this.gameIsOver = false; //This property will ste up the initial value. If this value is true, the game loop will stop by clearInterval
    this.gameIntervalId; // Setting up the property
    this.gameLoopFrequency = Math.round(1000/60); // 60fps
    this.soundtrack = null; // Setting up the property, but as null so it will not start right away
    this.player = new Player( // Creating the player, and giving the values of the proprierties of it
      this.gameScreen,
      100, // left property
      300, // top property
      50, // width property
      60, // height property
      "./docs/images/nana2.gif" // image source
    );
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    // Hide the start screen
    this.startScreen.style.display = "none";
    // Show the game screen
    this.gameScreen.style.display = "block";
    // Getting the div of HTML, and start playing the music, in a loop
    this.soundtrack = document.getElementById("soundtrack");
    this.soundtrack.play();
    this.soundtrack.loop = true; 
    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    // (If needed to clear, just have to clear the gameIntervalId
    
    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency) 
    

  }

  gameLoop() {
  
    //console.log("in the game loop");
    this.update();
    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId)
    }
  }

  update() {
    const scoreBoard = document.getElementById("game-scoreboard"); // Gets the element to be updated with the score
    if(this.isRunning) {
    this.player.move(); // Updates the player position in the Y-axis, based on the TOP property
    }

    // Checking obstacles colision, score and removal of the obstacles
    for (let i = 0; i < this.obstacles.length; i++) { // creating a FOR loop, running through the array
      const obstacle = this.obstacles[i];
      obstacle.move();
      // If the player collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (leaving by the left)
      else if (obstacle.left <  -60) { 
        // Increase the score by 1
        this.score++;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
      
    }
    
      scoreBoard.style.fontSize = "50px";       
      scoreBoard.style.border = "white";        // Styling and applying 
      scoreBoard.style.color = "black";         // the score on the screen
      scoreBoard.innerHTML= this.score;         

      if (this.lives === 0 || this.player.top + this.player.height >= this.height) {
          this.endGame();
          return;
        } // If statement checks, if the player life is zero according to the "FOR loop" in line 64
        // And checks if the player reaches the bottom, ending the game 


      // Obstacle creation and flow(timming) of the obstacles  .................|
      //                                                                        v
      const rap = Math.floor(Math.random() * 300)
      console.log(this.isRunning)

      if(this.counter === 0 && this.score<= 20 && this.isRunning === true){
          this.obstacles.push(new Obstacle(this.gameScreen, rap))
          this.obstacles.push(new ObstacleUpSide(this.gameScreen, rap))
          console.log("pushing")
          this.counter = 120;//                                         slow pace
          }
      else if(this.counter === 0 && this.score<= 40 && this.isRunning === true){
            this.obstacles.push(new Obstacle(this.gameScreen, rap))
            this.obstacles.push(new ObstacleUpSide(this.gameScreen, rap))
            console.log("pushing")
            this.counter = 95; //                                     medium pace
            }
      else if(this.counter === 0 && this.score> 40 && this.isRunning === true){
              this.obstacles.push(new Obstacle(this.gameScreen, rap))
              this.obstacles.push(new ObstacleUpSide(this.gameScreen, rap))
              console.log("pushing")
              this.counter = 80;//                                      fast pace
              }
      else  {
          //console.log(this.counter)
          if(this.isRunning === true) {
          this.counter--;
          }
      }
  }
  // Create a new method responsible for ending the game
  endGame() {
    const showResult = document.createElement("h3");
    this.player.element.remove();
    this.soundtrack.pause();
    this.obstacles.forEach(obstacle => obstacle.element.remove());
    this.gameIsOver = true;
    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
    showResult.innerHTML = `Score: ${this.score}`
    showResult.style.position = "absolute";
    showResult.style.top = "500px";
    showResult.style.left = "650px";
    showResult.style.top = "300px";
    showResult.style.fontSize = "60px";       
    showResult.style.fontFamily = "Jersey 25";      // Styling and applying 
    showResult.style.color = "white";  

    this.gameEndScreen.appendChild(showResult)

  }
}