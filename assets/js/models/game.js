function Game(canvas) {
  this.ctx = canvas.getContext('2d');

  this.background = new Background(this.ctx);
  this.currentBlock = new Block(this.ctx);
  this.helper = new Helpers();

  this.gameboard = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];

  var counterBlocks = 0;


  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {

    this.clear();
    this.draw();
    this.move();

    }.bind(this), DRAW_INTERVAL_MS)
  }

  Game.prototype.draw = function() {
    this.background.draw();
    this.currentBlock.draw();

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

    this.clearLines();
  }

  Game.prototype.move = function() {
    this.currentBlock.move();
    this.collitionY();
    this.colltionXleft();
    this.colltionXright();

    if (this.currentBlock.stopY) {
      for (i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++) {
        for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++){
          if (this.currentBlock.blockMatrix[i][j] !== 0 ) {
            this.gameboard[( this.currentBlock.y / SQUARE_SIZE ) + i ][( this.currentBlock.x / SQUARE_SIZE ) + j] = this.currentBlock.blockMatrix[i][j];
          }
        }
      }
      this.currentBlock = new Block(this.ctx);
      counterBlocks++;
      console.log(counterBlocks);
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

  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
