const mermaidGame = new MermaidGame();

let mode; // determine the game has started

function setup() {
  mode = 0; // initialy the game has not started
  createCanvas(600, 400);

  canvas = createCanvas(WIDTH, HEIGHT);
  heartImage = loadImage("img/heart.png");
  scoreImage = loadImage("img/coin.png");
  gameOverImage = loadImage("img/fish.png");
  mermaidImage = loadImage("img/mermaid.png");
  sharkImage = loadImage("img/shark.png");
  woodBoarderImage = loadImage("img/woodboarder.png");
  upImage = loadImage("img/up.png");
  downImage = loadImage("img/down.png");
  gameoverImage = loadImage("img/gameover.png");

  //console.log('im here')
  mermaidGame.preload();
  sharkImage = loadImage("img/shark.png");
  coinImage = loadImage("img/coin.png");
  mermaidGame.treasures.push(new Treasure());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  
  clear();
  
  if (mode == 0) {
    background(mermaidGame.backgroundImg);
    image(woodBoarderImage, 280, 65, 400, 400);
    image(upImage, 380, 200, 60, 60);
    let d = color(247, 247, 247)//color(47, 134, 166);
    fill(d);
    text(`move up`, WIDTH * 0.45, 242);
    textSize(30);
    textFont("Georgia");
    
    image(downImage, 380, 255, 60, 60);
    let m = color(247, 247, 247)//color(47, 134, 166);
    fill(m);
    text(`move down`, WIDTH * 0.45, 300);
    textSize(30);
    textFont("Georgia");


    let b = color(247, 247, 247)//color(47, 134, 166);
    fill(b);
    text(`press ENTER to start!`, WIDTH * 0.35, 350);
    textSize(30);
    textFont("Georgia");
    
    image(mermaidImage, 70, 25, 200, 200);
    image(sharkImage, 770, 205, 150, 150);
  }

  if (mode == 1) {
      if(frameCount % 60 == 0) {
          mermaidGame.updateGameStatus();
      }
    background(mermaidGame.backgroundImg);

    mermaidGame.sharks.forEach((shark) => shark.draw());
    mermaidGame.treasures.forEach((treasure) => treasure.draw());
    mermaidGame.mermaid.draw();

    // Score and Lives
    let c = color(47, 134, 166);
    fill(c);
    rect(WIDTH * 0.74, 35, 220, 75, 20);

    c = color(52, 190, 130);
    fill(c);
    text(`Score: ${mermaidGame.score}`, WIDTH * 0.83, 65);
    text(`Lives: ${mermaidGame.lives}`, WIDTH * 0.83, 100);
    textSize(25);
    textFont("Georgia");

    // made the relation between JS and CSS (Score and Lives)
    //document.getElementById("score").innerText = mermaidGame.score;
    //document.getElementById("lives").innerText = mermaidGame.lives;

    image(heartImage, 780, 75, 30, 30);
    image(coinImage, 785, 44, 20, 20);
    image(coinImage, 775, 44, 20, 20);
    image(coinImage, 765, 44, 20, 20);

    if (mermaidGame.lives == 0) {
        mode = 2
    }
  }

  if (mode == 2) {
    background(mermaidGame.backgroundImg);
    image(gameoverImage, 280, 65, 400, 400);
    
  }


}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }

  if (keyCode === 38) {
    mermaidGame.mermaid.moveUp();
  }
  if (keyCode === 40) {
    mermaidGame.mermaid.moveDown();
  }
}

