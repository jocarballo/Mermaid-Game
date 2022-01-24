const mermaidGame = new MermaidGame();


/* 
    Here I create the canvas and loading the images of the game
*/
function setup() {
    createCanvas(WIDTH, HEIGHT);
    //console.log('im here')
    mermaidGame.preload()
}

// Here I have the draw of background


function draw() {
    background(mermaidGame.backgroundImg);
    mermaidGame.mermaid.draw()
    mermaidGame.sharks.forEach(shark => shark.draw())
}  

function keyPressed() {
	
	if (keyCode === 38) {
		mermaidGame.mermaid.moveUp()
	}
	if (keyCode === 40) {
		mermaidGame.mermaid.moveDown()
	}

    console.log('key was pressed')
}