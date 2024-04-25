class Obstacle {
  constructor(gameScreen, top) {
    this.gameScreen = gameScreen;
    this.top = top + 200
    this.left = 1200;
    this.width = 80;
    this.height = 450;
    this.element = document.createElement("img");
    this.element.src = "./images/pipe2.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }
  
  updatePosition() {
    // Update the obstacle's position based on the property left 
    this.element.style.left = `${this.left}px`;
  }
  
  move() {
    // Move the obstacle down by 3px
    this.left -= 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}


class ObstacleUpSide {
  constructor(gameScreen, top) {
    this.gameScreen = gameScreen;
    this.top = top - 380
    this.left = 1200;
    this.width = 80;
    this.height = 450;
    this.element = document.createElement("img");
    this.element.src = "./images/UpsidePipe.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the property left
    this.element.style.left = `${this.left}px`; 
  }
  
  move() {
    // Move the obstacle down by 3px
    this.left -= 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}