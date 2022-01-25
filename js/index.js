const mermaidGame = new MermaidGame();
/* 
    Here I create the canvas and loading the images of the game
*/
function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);

  //console.log('im here')
  mermaidGame.preload();
  sharkImage = loadImage("../img/shark.png");
  coinImage = loadImage("../img/coin.png");
  schedulePositionUpdate();
  mermaidGame.treasures.push(new Treasure());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// Here I have the draw of background

function draw() {
  background(mermaidGame.backgroundImg);

  mermaidGame.sharks.forEach((shark) => shark.draw());
  mermaidGame.treasures.forEach((treasure) => treasure.draw());
  mermaidGame.mermaid.draw();
  rect(WIDTH * 0.88, 20, 80, 75);
  text(`Score: ${mermaidGame.score}`, WIDTH * 0.9, 50);
  text(`Lives: ${mermaidGame.lives}`, WIDTH * 0.9, 75);

  // made the relation between JS and CSS (Score and Lives)
  //document.getElementById("score").innerText = mermaidGame.score;
  //document.getElementById("lives").innerText = mermaidGame.lives;
}

function keyPressed() {
  if (keyCode === 38) {
    mermaidGame.mermaid.moveUp();
  }
  if (keyCode === 40) {
    mermaidGame.mermaid.moveDown();
  }
}

function schedulePositionUpdate() {
  setTimeout(function () {
    mermaidGame.updateGameStatus();
    schedulePositionUpdate();
  }, 1000);
}
