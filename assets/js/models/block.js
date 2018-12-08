function Block(ctx,x,y,blockMatrix,fallInterval) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.blockMatrix = blockMatrix;
  this.fallInterval = fallInterval;
  this.stopY = false;
  this.moveIntervalCount = 0;

  this.setListeners();
  this.helper = new Helpers();
}

Block.prototype.draw = function(blockMatrix) {

  for (i = 0; i <= blockMatrix.length - 1; i++) {
    var y = this.y + i * SQUARE_SIZE;

    for (j = 0; j <= blockMatrix[i].length -1; j++) { 
      var x = this.x + j * SQUARE_SIZE;
      if (this.blockMatrix[i][j] !== 0 ) {

        this.square = new Square(this.ctx);
        this.square.draw(x, y, this.helper.getColor(blockMatrix[i][j]));
      }
    }
  }
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
      this.blockMatrix = this.rotate(this.blockMatrix);
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

  if (this.moveIntervalCount % this.fallInterval === 0) {
    this.y += SQUARE_SIZE;
  }
  this.collitionYcanvas();
  this.collitionXcanvasLeft();
  this.collitionXcanvasRight();
}

Block.prototype.collitionY = function(currentMatrix) {
  var emptyElements = 0;
  var emptyLines = 0;
  for (i = currentMatrix.length - 1; i >= 0; i-- ) {
    for (j = 0; j <= currentMatrix[i].length - 1; j++ ) {
      if ( currentMatrix[i][j] === 0) {
        emptyElements++;
      }
    }
    if ( currentMatrix[i].length === emptyElements) {
      emptyElements = 0;
      emptyLines++;
    } else {
      break;
    }
  }
  return currentMatrix.length - emptyLines;
}

Block.prototype.collitionYcanvas = function() {
  var yCollition = this.collitionY(this.blockMatrix);
  if ( this.y + ( SQUARE_SIZE * yCollition ) >= this.ctx.canvas.height ) {
    this.y = this.ctx.canvas.height - ( SQUARE_SIZE * yCollition);
    this.stopY = true;
  }
}

Block.prototype.collitionXcanvasLeft = function() {
  var position;
  for (i = 0; i <= this.blockMatrix.length - 1; i++ ) {
    for (j = 0; j <= this.blockMatrix[i].length - 1; j++ ) {
      if ( this.blockMatrix[j][i] !== 0) {
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
  for (i = this.blockMatrix.length - 1; i >= 0; i-- ) {
    for (j = 0; j <= this.blockMatrix[i].length - 1; j++ ) {
      if ( this.blockMatrix[j][i] !== 0) {
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

