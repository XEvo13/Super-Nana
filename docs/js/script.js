window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const audioButton = document.getElementById("audioEffect");
  const audioVolume = document.getElementById("audioEffect"); 
  let game;

  startButton.addEventListener("click", () => {     // Adding eventListener to check if the start button is pressed
    startGame();
  });

  restartButton.addEventListener("click", () => {   // Adding eventListener to check if the restart button is pressed
    restartGame();
  });

  function startGame() {
    game = new Game();
    game.start(); 

  }

  function restartGame() {
    
    location.reload();
  }

  //Function that handles keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [" "];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      // Update player's directionY based on the key pressed
      if (key) {
            game.isRunning = true;
            game.player.directionY = - game.player.jumpPower; 
            audioButton.play(); 
            audioVolume.volume = 0.1;
      }
    }
  }
  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
};