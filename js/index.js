const mermaidGame = new MermaidGame();

/* 
    Here I create the canvas and loading the images of the game
*/
function setup() {
  createCanvas(WIDTH, HEIGHT);
  //console.log('im here')
  mermaidGame.preload();
  sharkImage = loadImage("../img/shark.png");
  coinImage = loadImage("../img/coin.png");
  schedulePositionUpdate();
  mermaidGame.treasures.push(new Treasure())

}

// Here I have the draw of background

function draw() {
  background(mermaidGame.backgroundImg);
  mermaidGame.mermaid.draw();
  mermaidGame.sharks.forEach((shark) => shark.draw());
  console.log()
  mermaidGame.treasures.forEach((treasure) => treasure.draw());
  console.log('treasure here')
}

function keyPressed() {
  if (keyCode === 38) {
    mermaidGame.mermaid.moveUp();
  }
  if (keyCode === 40) {
    mermaidGame.mermaid.moveDown();
  }

  console.log("key was pressed");
}

function schedulePositionUpdate() {
  setTimeout(function () {
    mermaidGame.updateGameStatus();
    schedulePositionUpdate()
  }, 1000);
}



