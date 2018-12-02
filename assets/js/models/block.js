function Block(ctx) {
  this.ctx = ctx;
  this.x = 120;
  this.y = 0;
  this.stopY = false;
  this.moveIntervalCount = 0;

  this.blocks = [I_BLOCK, O_BLOCK, T_BLOCK, Z_BLOCK, S_BLOCK, L_BLOCK, J_BLOCK];

  this.currentBlock = this.blocks[this.getRandomBlock(this.blocks)];

  this.setListeners();
  this.helper = new Helpers();

}

Block.prototype.draw = function() {

  for (i = 0; i <= this.currentBlock.length - 1; i++) {
    var y = this.y + i * SQUARE_SIZE;

    for (j = 0; j <= this.currentBlock[i].length -1; j++) { 
      var x = this.x + j * SQUARE_SIZE;
      if (this.currentBlock[i][j] !== 0 ) {

        this.square = new Square(this.ctx);
        this.square.draw(x, y, this.helper.getColor(this.currentBlock[i][j]));
      }
    }
  }
}

Block.prototype.getRandomBlock = function(blocksArray) {
  var selectedBlock = Math.floor(Math.random() * blocksArray.length)
  return selectedBlock;
}

Block.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Block.prototype.onKeyDown = function(event) {
  if (this.stopY === true) { return; }
  
  switch (event.keyCode) {
    case KEY_RIGHT:
    if (this.stopXright === true) { return; }
      this.x += SQUARE_SIZE;
      break;
    case KEY_LEFT:
      if (this.stopXleft === true) { return; }
      this.x -= SQUARE_SIZE;
      break;
    case KEY_UP:    
      this.currentBlock = this.rotate(this.currentBlock);
      break;
    case KEY_DOWN:  
      this.y += SQUARE_SIZE;
      break;
  }
};

Block.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
    case KEY_LEFT:
      this.x = this.x;
      break;
      case KEY_DOWN:
      this.y = this.y;
      break;
  }
};

Block.prototype.arrayClone = function( arr ) {
  if( Array.isArray( arr ) ) {
      var copy = arr.slice( 0 );
      for( var i = 0; i < copy.length; i++ ) {
          copy[ i ] = this.arrayClone( copy[ i ] );
      }
      return copy;
  }
  return arr;
}

Block.prototype.rotate = function(block) { 
  var rotatedBlock = this.arrayClone(block);
  for (i = 0; i <= block.length - 1; i++) {
    for ( j = 0; j <= block[i].length - 1; j++){
      rotatedBlock[i][j] = block[j][block.length -1 - i];
    }
  }
  return rotatedBlock;
}

Block.prototype.move = function() {
  this.moveIntervalCount++;

  if (this.moveIntervalCount % FALL_INTERVAL === 0) {
    this.y += SQUARE_SIZE;
  }

  this.collitionYcanvas();
  this.collitionXcanvasLeft();
  this.collitionXcanvasRight();
}

  Block.prototype.collitionYcanvas = function() {
    var emptyElements = 0;
    var emptyLines = 0;
    for (i = this.currentBlock.length - 1; i >= 0; i-- ) {
      for (j = 0; j <= this.currentBlock[i].length - 1; j++ ) {
        if ( this.currentBlock[i][j] === 0) {
          emptyElements++;
        }
      }
      if ( this.currentBlock[i].length === emptyElements) {
        emptyElements = 0;
        emptyLines++;
      } else {
        break;
      }
    }
    if ( this.y + ( SQUARE_SIZE * (this.currentBlock.length - emptyLines)) >= this.ctx.canvas.height ) {
      this.y = this.ctx.canvas.height - ( SQUARE_SIZE * (this.currentBlock.length - emptyLines));
      this.stopY = true;
    }
  }

  Block.prototype.collitionXcanvasLeft = function() {
    var position;
    for (i = 0; i <= this.currentBlock.length - 1; i++ ) {
      for (j = 0; j <= this.currentBlock[i].length - 1; j++ ) {
        if ( this.currentBlock[j][i] !== 0) {
          position = i;
          break;
        }
      }
      if (position !== undefined ) {
        break;
      }
    } 
    if ( this.x + ( SQUARE_SIZE * position) <= 0 ) {
      this.x = 0 - ( SQUARE_SIZE * position );
    }
  }

  Block.prototype.collitionXcanvasRight = function() {
    var position;
    for (i = this.currentBlock.length - 1; i >= 0; i-- ) {
      for (j = 0; j <= this.currentBlock[i].length - 1; j++ ) {
        if ( this.currentBlock[j][i] !== 0) {
          position = i;
          break;
        }
      }
      if (position !== undefined ) {
        break;
      }
    } 
    if ( this.x + ( SQUARE_SIZE * ( position + 1)) >= this.ctx.canvas.width ) {
      this.x = this.ctx.canvas.width - ( SQUARE_SIZE * ( position + 1));
    }
  }

