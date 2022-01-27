class MermaidGame {
  constructor() {
    this.mermaid = new Mermaid();
    this.treasures = [];
    this.sharks = [];
    this.background = new Background();
    this.score = 0;
    this.lives = 3;
  }

  clear() {
    this.lives = 1;
    this.score = 0;
    this.sharks = [];
    this.treasures = [];
  }

  updateGameStatus() {
    this.sharks.forEach((shark) => shark.updatePosition());

    //console.log("Number of active sharks:" + this.sharks.length);

    // I want to put a new shark when I've got less than 3 in canvas
    if (this.sharks.length < 4) {
      // I add sharks to the sharks array
      this.sharks.push(new Shark());
      //console.log(this.sharks)
    }

    // ---------------------------------" --------------------------------------------"
    this.treasures.forEach((treasure) => treasure.updatePosition());
    //console.log("Number of active coins:" + this.treasures.length);

    // put a new coin when got less than 3 in canvas
    if (this.treasures.length < 5) {
      //add coins to the treasures array
      //console.log(this.treasures)

      let treasureRow = Math.floor(
        Math.random() * (NUMBER_OF_SQUARES_IN_COL - 1)
      );
      let treasureCol = NUMBER_OF_SQUARES_IN_ROW - 1;
      console.log("" + treasureRow + " " + treasureCol);
      let hasNoCollision = this.sharks.every((shark) => {
        return shark.row != treasureRow || shark.col != treasureCol;
      });

      if (hasNoCollision) {
        this.treasures.push(new Treasure(treasureRow, treasureCol));
      }
    }

    this.collision();

    // check positions of coins are valid
    // here filtered the treasures array and returned the ones that are in the image ( col > 0). Then, removed the coin when collise with mermaid
    //console.log("Coins before: " + this.treasures.length);
    let mermaidRow = this.mermaid.row;
    let mermaidCol = this.mermaid.col;

    this.treasures = this.treasures.filter(function (treasure) {
      let treasureRow = treasure.row;
      let treasureCol = treasure.col;

      return (treasure.col >= 0 && (treasureRow != mermaidRow || treasureCol != mermaidCol));
    });

    // check if positions of sharks are valid
    // filter the sharks array and return the ones that are in the image ( col > 0)
    //console.log("Sharks before: " + this.sharks.length);
    this.sharks = this.sharks.filter(function (shark) {
      let sharkRow = shark.row;
      let sharkCol = shark.col;
      return (shark.col >= 0 && (sharkRow != mermaidRow || sharkCol != mermaidCol));
    });
  }

  preload() {
    this.background.preload();

    this.mermaid.preload();

    // NÃO DEVIA FAZER PRELOAD AQUI DAS COINS TAMBÉM?
    for (let i = 0; i < this.sharks.length; i++) {
      let shark = this.sharks[i];
      shark.preload();
    }
  }

  collision() {
    let mermaidRow = this.mermaid.row;
    let mermaidCol = this.mermaid.col;

    this.sharks.forEach((shark) => {
      let sharkRow = shark.row;
      let sharkCol = shark.col;
      if (sharkRow == mermaidRow && sharkCol == mermaidCol) {
        console.log("There was a collision");
        this.lives = this.lives - 1;
      }
    });

    this.treasures.forEach((treasure) => {
      let treasureRow = treasure.row;
      let treasureCol = treasure.col;
      if (treasureRow == mermaidRow && treasureCol == mermaidCol) {
        console.log("There was a collision");
        coinSound.play();
        this.score = this.score + 10;
      }
    });
  }
}

class Background {
  constructor() {
    this.backgroundImages;
  }

  draw() {
    //console.log("this is the background");
    // width and height are variables set by P5
    this.backgroundImages.forEach(function (img) {
      img.x -= img.speed;
      image(img.src, img.x, 0, width, height);
      image(img.src, img.x + width, 0, width, height);
      if (img.x <= -width) {
        img.x = 0;
      }
    });
  }

  preload() {
    this.backgroundImages = [
      { src: loadImage("img/1.png"), x: 0, speed: 0 },
      { src: loadImage("img/2.png"), x: 0, speed: 1 },
      { src: loadImage("img/3.png"), x: 0, speed: 1 },
      { src: loadImage("img/4.png"), x: 0, speed: 1 },
      { src: loadImage("img/5.png"), x: 0, speed: 1 },
      { src: loadImage("img/6.png"), x: 0, speed: 2 },
      { src: loadImage("img/7.png"), x: 0, speed: 2 },
      { src: loadImage("img/8.png"), x: 0, speed: 3 },
    ];
  }
}

class Mermaid {
  constructor() {
    this.row = 0;
    this.col = 1;
    //the same value of the square just to simplify
    this.width = WIDTH_OF_SQUARE;
    this.height = HEIGHT_OF_SQUARE;
    this.image;
  }

  preload() {
    //here I need to put mermaids img
    this.image = loadImage("img/mermaid.png");
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
    let x = WIDTH_OF_SQUARE * this.col;
    let y = HEIGHT_OF_SQUARE * this.row;
    //console.log('width : ' + WIDTHOFSQUARE)
    //console.log('height: ' + HEIGHTOFSQUARE)
    image(this.image, x, y, this.width, this.height);
    //console.log("drawing mermaid");
  }
}

class Treasure {
  constructor(row, col) {
    // random position of coin
    this.row = row;
    this.col = col;
    this.width = WIDTH_OF_SQUARE / 3;
    this.height = HEIGHT_OF_SQUARE / 3;
    this.image = coinImage;
  }

  updatePosition() {
    this.col = this.col - 1;
  }

  draw() {
    //defining the position of coin
    let x = WIDTH_OF_SQUARE * this.col + this.width;
    let y = HEIGHT_OF_SQUARE * this.row + this.height;
    //console.log('width : ' + WIDTHOFSQUARE)
    //console.log('height: ' + HEIGHTOFSQUARE)
    image(this.image, x, y, this.width, this.height);
    //console.log("drawing coin");
  }
}

class Shark {
  constructor() {
    // random position of shark
    let randomRow = Math.floor(Math.random() * (NUMBER_OF_SQUARES_IN_COL - 1));
    //console.log(randomRow)
    this.row = randomRow;
    this.col = 9;
    this.width = WIDTH_OF_SQUARE;
    this.height = HEIGHT_OF_SQUARE;
    this.image = sharkImage;
  }

  updatePosition() {
    this.col = this.col - 1;
  }

  draw() {
    //defining the position of shark
    let x = WIDTH_OF_SQUARE * this.col;
    let y = HEIGHT_OF_SQUARE * this.row;
    //console.log('width : ' + WIDTHOFSQUARE)
    //console.log('height: ' + HEIGHTOFSQUARE)
    image(this.image, x, y, this.width, this.height);
    //console.log("drawing shark");
    //console.log(this.row)
  }
}


