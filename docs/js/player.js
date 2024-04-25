class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.jumpPower = 6;
    this.gravity = 0.4; 
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    // Set up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);

    this.audioEffect = null; //added
    this.audioVolume = 0.1; //added
  }
  
  move() {
    // Update player position based on directionY
    
    this.directionY = this.directionY + this.gravity;
    this.top += this.directionY;
    // Ensure the player stays within the game screen
    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }

    // handles bottom side
    if (this.top + this.height > this.gameScreen.offsetHeight ) {
      this.top = this.gameScreen.offsetHeight - this.height;
    }
    
    // Update player position on the screen
    this.updatePosition();
  }
  
  updatePosition() {
    // Update the player position based on the TOP property
    this.element.style.top = `${this.top}px`;
  }
  
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();          // saving the player position and size to the variable "playerRect"
    const obstacleRect = obstacle.element.getBoundingClientRect();    // saving the obstacle position and size to the variable "obstacleRect"
    if (
      playerRect.left < obstacleRect.right &&         //
      playerRect.right > obstacleRect.left &&         // Checking if the player and obstacles
      playerRect.top < obstacleRect.bottom &&         // position cross
      playerRect.bottom > obstacleRect.top            //
    ) {
      return true;        // return this result, to the game.js, eliminating the obstacle from DOM, the array, and taking player's life
    }
    else {
      return false;
    }
  }
}