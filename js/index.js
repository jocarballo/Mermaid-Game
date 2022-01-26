const mermaidGame = new MermaidGame();
/* 
    Here I create the canvas and loading the images of the game
*/
function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);

  //console.log('im here')
  mermaidGame.preload();
  sharkImage = loadImage("./img/shark.png");
  coinImage = loadImage("./img/coin.png");
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

  // Score and Lives
  let c = color(255, 204, 0);
  fill(c);
  rect(WIDTH * 0.74, 35, 240, 75, 20);

    c = color(0, 128, 128);
  fill(c);
  text(`Score: ${mermaidGame.score}`, WIDTH * 0.85, 65);
  text(`Lives: ${mermaidGame.lives}`, WIDTH * 0.85, 100);
  textSize(25);
  textFont("Georgia");

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


