function Game(canvas) {
  this.ctx = canvas.getContext('2d');
  this.intervalId = undefined;

  this.background = new Background(this.ctx);

  this.secondaryCanvas = document.getElementById("secondary-canvas");
  this.secondCtx = this.secondaryCanvas.getContext('2d');
  this.nextBlockBg = new Background(this.secondCtx);

  this.gameboard = GAMEBOARD.map(function(elem) {
    var newElem = Object.assign([],elem);
    return newElem;
  });

  this.intervalFall = FALL_INTERVAL;
  this.blocksAcumArr = [];
  this.createNewBlock();

  this.helper = new Helpers();

  this.blocksCounter = 0;

}

Game.prototype.start = function() {

  if (!this.isRunning()) {
    this.intervalId = setInterval(function() {

    this.clear();
    
    
    this.drawAll();
    this.moveAll();

    if (this.checkGameOver()) {
      this.gameOver();
    }
    }.bind(this), DRAW_INTERVAL_MS)
  }
}

Game.prototype.drawAll = function() {
  this.background.draw();
  this.nextBlockBg.draw();
  this.drawGameboard();


  this.currentBlock.draw(this.currentBlock.blockMatrix);
  this.nextBlock.draw(this.nextBlock.blockMatrix);

  this.clearLines();
}

Game.prototype.checkGameOver = function() {
  return this.gameboard[0].some(function(number) {
    return number !== 0;
  })
};

Game.prototype.moveAll = function() {
  this.clearLines;
  this.currentBlock.move();
  this.collitionY();
  this.colltionXleft();
  this.colltionXright();
  
  if ( this.currentBlock.stopY ) {
    this.addBlocktoBg();
    this.createNewBlock();
    //console.log("número de piezas", this.blocksCounter);
  }
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Game.prototype.isRunning = function() {
  return this.intervalId !== undefined;
}

Game.prototype.gameOver = function() {
  clearInterval(this.intervalId);
  this.intervalId = undefined;

  if (confirm("GAME OVER! Play again?")) {
    location.reload();
  }
};

Game.prototype.getNewBlock = function() {
  this.newBlockMatrix = BLOCKS_ARRAY[Math.floor(Math.random() * BLOCKS_ARRAY.length)] ;
  return this.newBlockMatrix;
}


Game.prototype.createNewBlock = function() {
  if ( this.blocksAcumArr.length === 0){
    this.newBlockMatrix = this.getNewBlock();
    this.blocksAcumArr.push(this.newBlockMatrix);
    this.nextBlock = new Block(this.secondCtx, 30, 30, this.newBlockMatrix, this.intervalFall);
    this.currentBlock = new Block(this.ctx, 120, 0,this.getNewBlock(), this.intervalFall);
  } else {
    this.decreaseInterval();
    this.newBlockMatrix = this.getNewBlock();
    this.nextBlock = new Block(this.secondCtx, 30, 30, this.newBlockMatrix, this.intervalFall);
    this.blocksAcumArr.push(this.newBlockMatrix);
    var currentBlockMatrix = this.blocksAcumArr[this.blocksAcumArr.length - 2];
    this.currentBlock = new Block(this.ctx, 120, 0, currentBlockMatrix, this.intervalFall);
  }
  this.blocksCounter++;
}

Game.prototype.drawGameboard = function() {
  for (i = 0; i <= this.gameboard.length - 1; i++) {
    var y = i * SQUARE_SIZE;

    for (j = 0; j <= this.gameboard[i].length -1; j++) { 
      var x = j * SQUARE_SIZE;
      if (this.gameboard[i][j] !== 0 ) {

        square = new Square(this.ctx);
        square.draw(x, y, this.helper.getColor(this.gameboard[i][j]));
      }
    }
  }
}

Game.prototype.clearLines = function() {
  for (i = 0; i <= this.gameboard.length - 1; i++) {

    var line = this.gameboard[i];
    var counterElements = 0;
  
    for (j = 0; j <= this.gameboard[i].length -1; j++) {   
      if (line[j] != 0) {
        counterElements++;
      }
    };
  
    if (counterElements === this.gameboard[i].length) {
      this.gameboard.splice(i,1);
      this.gameboard.unshift(EMPTY_GAMEBOARD_LINE);
      for (i = 0; i <= this.gameboard.length - 1; i++) {

        var line = this.gameboard[i];
      
        for (j = 0; j <= this.gameboard[i].length -1; j++) {   
          if (line[j] != 0) {
            line[j].y += line[j].w;
          }
        };
      };
    };
  };
}

Game.prototype.addBlocktoBg = function() {
  for (i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++){
      if (this.currentBlock.blockMatrix[i][j] !== 0 ) {
        this.gameboard[( this.currentBlock.y / SQUARE_SIZE ) + i ]
        [( this.currentBlock.x / SQUARE_SIZE ) + j] = this.currentBlock.blockMatrix[i][j];
      }
    }
  }
}

Game.prototype.collitionY = function() {

  for ( i = this.currentBlock.blockMatrix.length - 1; i >= 0; i-- ) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++ ) {
      if ( this.currentBlock.blockMatrix[i][j] !== 0 &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== undefined &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE]
        [(this.currentBlock.x + (j * SQUARE_SIZE)) / SQUARE_SIZE] !== 0 )  {

        this.currentBlock.stopY = true;
      }
    }
  }
}

Game.prototype.colltionXleft = function() {
  for ( i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++ ) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++ ) {
      if ( this.currentBlock.blockMatrix[i][j] !== 0 &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== undefined &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE]
        [(this.currentBlock.x + ((j - 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== 0 ) {
          this.currentBlock.stopXleft = true;
          var xInit = this.currentBlock.x;
        } 
      if ( this.currentBlock.stopXleft === true && xInit !== this.currentBlock.x ) {
        this.currentBlock.stopXleft = false;
      }
    }
  }
}

Game.prototype.colltionXright = function() {
  for ( i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++ ) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++ ) {
      if ( this.currentBlock.blockMatrix[i][j] !== 0 &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== undefined &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE]
        [(this.currentBlock.x + ((j + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== 0 ) {
          this.currentBlock.stopXright = true;
          var xInit = this.currentBlock.x;
        } 
      if ( this.currentBlock.stopXright === true && xInit !== this.currentBlock.x ) {
        this.currentBlock.stopXright = false;
      }
    }
  }
}

Game.prototype.decreaseInterval = function() {
  if ( this.blocksCounter !== 0 && this.blocksCounter % 10 === 0 ) {
    this.intervalFall = this.intervalFall / 2;
  }
}