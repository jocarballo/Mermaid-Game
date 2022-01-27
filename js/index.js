const mermaidGame = new MermaidGame();

let mode; // determine the game has started

function preload() {
  preloadImages();
  preloadSounds();
}

function preloadImages() {
  heartImage = loadImage("img/heart.png");
  scoreImage = loadImage("img/coin.png");
  mermaidImage = loadImage("img/mermaid.png");
  sharkImage = loadImage("img/shark.png");
  woodBoarderImage = loadImage("img/woodboarder.png");
  upImage = loadImage("img/up.png");
  downImage = loadImage("img/down.png");
  gameoverImage = loadImage("img/gameover.png");
  coinImage = loadImage("img/coin.png");
  mermaidGame.preload();
}

function preloadSounds() {
  coinSound = loadSound("assets/soundOfCoins.mp3");
  waterSound = loadSound("assets/soundOfWater.mp3");
  gameOverSound = loadSound("assets/soundOfGameover.mp3");
}

function setup() {
  mode = 0; // initialy the game has not started
  createCanvas(WIDTH, HEIGHT);

  waterSound.loop();
}

function draw() {
  //console.log("draw " + mode);
  clear();
  mermaidGame.background.draw();

  if (mode == 0) {
    drawStartGame();
  }

  if (mode == 1) {
    if (frameCount % 40 == 0) {
      mermaidGame.updateGameStatus();
    }

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
      gameOverSound.play();
      mode = MODE_GAME_OVER;
    }
  }

  if (mode == MODE_GAME_OVER) {
    //background(mermaidGame.backgroundImg);
    image(gameoverImage, 280, 45, 400, 400);

    let s = color(36, 161, 156);
    fill(s);
    rect(WIDTH * 0.22, 450, 525, 75, 100);

    let f = color(247, 247, 247); //color(47, 134, 166);
    fill(f);
    textSize(55);
    textFont("Georgia");
    text(`Your score: ${mermaidGame.score}!!`, WIDTH * 0.28, 500);

    let n = color(36, 161, 156);
    fill(n);
    rect(WIDTH * 0.26, 545, 452, 75, 40);

    let k = color(247, 247, 247); //color(47, 134, 166);
    fill(k);
    textSize(35);
    textFont("Georgia");
    text(`press R to restart the game!`, WIDTH * 0.28, 592);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }

  if (keyCode === 38) {
    mermaidGame.mermaid.moveUp();
    mermaidGame.collision();
  }
  if (keyCode === 40) {
    mermaidGame.mermaid.moveDown();
    mermaidGame.collision();
  }

  if (keyCode === 82 && mode == MODE_GAME_OVER) {
    mode = 1;
    console.log("mode 1 here");
    mermaidGame.clear();
  }
}

function drawStartGame() {
  drawWoodenBoard();
  drawKeyInstruction("Move Up", upImage, 300);
  drawKeyInstruction("Move Down", downImage, 360);

  text(`press ENTER to start!`, WIDTH * 0.35, 450);

  image(mermaidImage, 70, 105, 200, 200);
  image(sharkImage, 770, 405, 150, 150);

  let h = color(47, 134, 166);
  fill(h);
  textFont("Tahoma");
  textSize(80);
  text("MERMAID GAME", 220, 110);
}

function drawWoodenBoard() {
  image(woodBoarderImage, 280, 155, 400, 400);
}

function drawKeyInstruction(instructionText, keyImage, y) {
  image(keyImage, 380, y, 60, 60);
  let d = color(247, 247, 247);
  fill(d);
  textSize(25);
  textFont("Georgia");
  text(instructionText, WIDTH * 0.45, y + 40);
}

// IMAGES

let sharkImage;
let coinImage;
let backgroundImage;
let heartImage;

// SOUNDS

let coinSound;
let waterSound;
let gameOverSound;

// MODE CONSTANTS
const MODE_GAME_OVER = 2;
