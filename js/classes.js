class MermaidGame {
  constructor() {
    this.mermaid = new Mermaid();
    this.treasures = [];
    this.hearts = [];
    this.sharks = [new Shark()];
    this.backgroundImg;
    this.score = 0;
    this.lives = 0;
  }

  setUp() {}

  preload() {
    this.backgroundImg = loadImage("../img/background.png");
    this.mermaid.preload();
    for (let i = 0; i < this.sharks.length; i++) {
      let shark = this.sharks[i];
      shark.preload();
    }
  }

  draw() {}
}

class Mermaid {
  constructor(row, col) {
    this.row = 0;
    this.col = 0;
    //the same value of the square just to simplify
    this.width = WIDTH_OF_SQUARE;
    this.height = HEIGHT_OF_SQUARE;
    this.image;
  }

  preload() {
    //here I need to put mermaids img
    this.image = loadImage("../img/mermaid.png");
  }

  moveUp() {
    //Here I have the limits of the position of mermaid
    if (this.row > 0) {
      this.row = this.row - 1;
    }
  }

  moveDown() {
    //Here I have the limits of the position of mermaid
    if (this.row < NUMBER_OF_SQUARES_IN_COL - 1) {
      this.row = this.row + 1;
    }
  }

  draw() {
    //defining the position of mermaid
    let x = this.row;
    let y = HEIGHT_OF_SQUARE * this.row;
    //console.log('width : ' + WIDTHOFSQUARE)
    //console.log('height: ' + HEIGHTOFSQUARE)
    image(this.image, x, y, this.width, this.height);
    //console.log("drawing mermaid");
  }
}

class Treasure {
  constructor() {
    this.row = 0;
    this.col = 0;
    this.width = 50;
    this.height = 50;
    this.image;
  }

  updatePosition() {
    this.col = this.col - 1;
  }
}

class Heart {
  constructor() {
    this.row = 0;
    this.col = 0;
    this.width = 50;
    this.height = 50;
    this.image;
  }

  updatePosition() {
    this.col = this.col - 1;
  }
}

class Shark {

  constructor() {
    // random position of shark
    let randomRow = Math.floor(Math.random() * (NUMBER_OF_SQUARES_IN_COL - 1));
    console.log(randomRow)
    this.row = randomRow;
    this.col = 9;
    this.width = WIDTH_OF_SQUARE;
    this.height = HEIGHT_OF_SQUARE;
    this.image;
  }

  preload() {
    //here I need to put sharks img
    this.image = loadImage("../img/shark.png");
  }

  updatePosition() {
    this.col = this.col - 1;
  }

  collision(mermaidInfo) {
    // here the shark detects a collision with the mermaid
  }

  draw() {
    //defining the position of shark
    let x = WIDTH_OF_SQUARE * this.col;
    let y = HEIGHT_OF_SQUARE * this.row;
    //console.log('width : ' + WIDTHOFSQUARE)
    //console.log('height: ' + HEIGHTOFSQUARE)
    image(this.image, x, y, this.width, this.height);
    console.log("drawing shark");
    console.log(this.row)
  }
}

/* ------------------------------------------------------ */
