function Game(canvas) {
  this.ctx = canvas.getContext('2d');

  this.background = new Background(this.ctx);
  this.currentBlock = new Block(this.ctx);

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
    // this.gameboard.forEach(function(line) {
    //   line.forEach(function(block) {
    //     if (block != 0 ) {
    //       block.draw();
    //     }
    //   })
    // });
    // this.clearLines();
  }

  Game.prototype.move = function() {
    this.currentBlock.move();
    
  //   var collisions = [];
  //   this.gameboard.forEach(function(lines){
  //     lines.forEach(function(blocksToCollideWith) {
        
  //       if ( blocksToCollideWith.x + blocksToCollideWith.w === this.currentBlock.x
  //         && blocksToCollideWith.y === this.currentBlock.y) {
  //         this.currentBlock.stopXleft = true;
  //       } else if ( blocksToCollideWith.x + blocksToCollideWith.w != this.currentBlock.x
  //           && blocksToCollideWith.y === this.currentBlock.y) {
  //           this.currentBlock.stopXleft = false;
  //       }

  //       if ( blocksToCollideWith.x === this.currentBlock.x + this.currentBlock.w
  //         && blocksToCollideWith.y === this.currentBlock.y) {
  //         this.currentBlock.stopXright = true;
  //       } else if ( blocksToCollideWith.x != this.currentBlock.x + this.currentBlock.w
  //           && blocksToCollideWith.y === this.currentBlock.y) {
  //           this.currentBlock.stopXright = false;
  //       }

  //       if ( blocksToCollideWith.y === this.currentBlock.y + this.currentBlock.h
  //         && blocksToCollideWith.x === this.currentBlock.x ) {
  //         collisions.push(blocksToCollideWith);
  //       }
  //     }.bind(this))
  //   }.bind(this));

  //   if (collisions[0]) {
  //     this.currentBlock.stopY = true;
  //   }
    
    if (this.currentBlock.stopY === true) {
      // this.gameboard[this.currentBlock.y / SQUARE_SIZE][this.currentBlock.x / SQUARE_SIZE] = this.currentBlock;
      // this.currentBlock = new Block(this.ctx);
    }
  }

  // Game.prototype.clearLines = function() {
  //   for (i = 0; i <= this.gameboard.length - 1; i++) {
  
  //     var line = this.gameboard[i];
  //     var counterElements = 0;
    
  //     for (j = 0; j <= this.gameboard[i].length -1; j++) {   
  //       if (line[j] != 0) {
  //         counterElements++;
  //       }
  //     };
    
  //     if (counterElements === this.gameboard[i].length) {
  //       this.gameboard.splice(i,1);
  //       this.gameboard.unshift(EMPTY_GAMEBOARD_LINE);
  //       for (i = 0; i <= this.gameboard.length - 1; i++) {
  
  //         var line = this.gameboard[i];
        
  //         for (j = 0; j <= this.gameboard[i].length -1; j++) {   
  //           if (line[j] != 0) {
  //             line[j].y += line[j].w;
  //           }
  //         };
  //       };
  //     };
  //   };
  // }

  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
