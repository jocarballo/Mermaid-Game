class MermaidGame {
  constructor() {
    this.mermaid = new Mermaid();
    this.treasures = [];
    this.hearts = [];
    this.sharks = [];
    this.backgroundImg;
    this.score = 0;
    this.lives = 0;
  }

  updateGameStatus() {
    this.sharks.forEach((shark) => shark.updatePosition());

    // check positions of sharks are valid
    // here I filtered the sharks array and returned the ones that are in the image ( col > 0)
    console.log("Sharks before: " + this.sharks.length);
    this.sharks = this.sharks.filter(function (shark) {
      return shark.col >= 0;
    });

    console.log("Number of active sharks:" + this.sharks.length);

    // I want to put a new shark when I've got less than 3 in canvas
    if (this.sharks.length < 3) {
      // I add sharks to the sharks array
      this.sharks.push(new Shark());
      //console.log(this.sharks)
    }

    // ---------------------------------" --------------------------------------------"
    this.treasures.forEach((treasure) => treasure.updatePosition());

    // check positions of coins are valid
    // here I filtered the treasures array and returned the ones that are in the image ( col > 0)
    console.log("Coins before: " + this.treasures.length);
    this.treasures = this.treasures.filter(function (treasure) {
      return treasure.col >= 0;
    });

    console.log("Number of active coins:" + this.treasures.length);

    // I want to put a new coin when I've got less than 3 in canvas
    if (this.treasures.length < 2) {
        // I add coins to the treasures array
        this.treasures.push(new Treasure());
        //console.log(this.treasures)
      }

    this.collision();
  }

  preload() {
    this.backgroundImg = loadImage("../img/background.png");
    this.mermaid.preload();
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
      console.log(`${mermaidRow} ${mermaidCol} ${sharkRow} ${sharkCol}`);
      if (sharkRow == mermaidRow && sharkCol == mermaidCol) {
        console.log("There was a collision");
        this.lives = this.lives - 1;
      }
    });

    this.treasures.forEach((treasure) => {
      let treasureRow = treasure.row;
      let treasureCol = treasure.col;
      console.log(`${mermaidRow} ${mermaidCol} ${treasureRow} ${treasureCol}`);
      if (treasureRow == mermaidRow && treasureCol == mermaidCol) {
        console.log("There was a collision");
        this.score = this.score + 10;
      }
    });
  }
}

class Mermaid {
  constructor() {
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
    // random position of coin
    let randomCoinRow = Math.floor(
      Math.random() * (NUMBER_OF_SQUARES_IN_COL - 1)
    );
    //console.log(randomRow)
    this.row = randomCoinRow;
    this.col = 9;
    this.width = WIDTH_OF_SQUARE/3;
    this.height = HEIGHT_OF_SQUARE/3;
    this.image = coinImage;
  }

  updatePosition() {
    this.col = this.col - 1;
  }

  draw() {
    //defining the position of coin
    let x = (WIDTH_OF_SQUARE * this.col) + this.width;
    let y = (HEIGHT_OF_SQUARE * this.row) + this.height;
    //console.log('width : ' + WIDTHOFSQUARE)
    //console.log('height: ' + HEIGHTOFSQUARE)
    image(this.image, x, y, this.width, this.height);
    console.log("drawing coin");
    //console.log(this.row)
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
    //console.log(randomRow)
    this.row = randomRow;
    this.col = 9;
    this.width = WIDTH_OF_SQUARE;
    this.height = HEIGHT_OF_SQUARE;
    this.image = sharkImage;
  }

  preload() {}

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

    // made the relation between JS and CSS (Score and Lives)
    document.getElementById("score").innerText = mermaidGame.score;

    document.getElementById("lives").innerText = mermaidGame.lives;
  }
}

/* ------------------------------------------------------ */

let sharkImage;
let coinImage;
