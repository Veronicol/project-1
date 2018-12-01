function Block(ctx) {
  this.ctx = ctx;
  this.x = 120;

  this.y = 0;
  this.yMin = 0;

  this.stopXleft = false;
  this.stopXright =false;
  this.stopY = false;
  this.moveIntervalCount = 0;

  this.blocks = [I_BLOCK, O_BLOCK, T_BLOCK, Z_BLOCK, S_BLOCK, L_BLOCK, J_BLOCK];

  this.currentBlock = this.blocks[this.getRandomBlock(this.blocks)];

  square = new Square(this.ctx);
  this.setListeners();

}

Block.prototype.draw = function() {

  for (i = 0; i <= this.currentBlock.matrix.length - 1; i++) {
    y = this.y + i * SQUARE_SIZE;

    for (j = 0; j <= this.currentBlock.matrix[i].length -1; j++) { 
      x = this.x + j * SQUARE_SIZE;
      if (this.currentBlock.matrix[i][j] !== 0 ) {
        square.draw(x,y,this.currentBlock.color);
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
      this.currentBlock.matrix = this.rotate(this.currentBlock.matrix);
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
  console.log(this.y);
  this.yMin = this.y + (this.calculateMin(this.currentBlock.matrix) * SQUARE_SIZE);
  if (this.yMin >= this.ctx.canvas.height ) { 
    this.y = this.ctx.canvas.height - (this.calculateMin(this.currentBlock.matrix) * SQUARE_SIZE);
    this.stopY = true;
  }
}

Block.prototype.calculateMin = function(block) {
  var newMatrix = [];

  for (i = 0; i <= block.length - 1; i++) {
    var newLine= block[i].filter(function(elem) {
      return elem != 0;
    });
    if (newLine.length > 0) {
      newMatrix.push(newLine);
    }
  }
  return newMatrix.length;
}

