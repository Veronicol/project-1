function Game(canvas) {
  this.ctx = canvas.getContext('2d');

  this.background = new Background(this.ctx);
  this.square = new Square(this.ctx);

  this.blocksArray = [];
  this.counterArray = [
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

  this.drawInitializer = 0; 
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {

  this.clear();
  this.draw();
  this.move();

  }.bind(this), DRAW_INTERVAL_MS)
}


Game.prototype.draw = function() {
  this.background.draw();
  this.blocksArray.forEach(function(block) {
    block.draw();
  });
    if (this.drawInitializer === 0) {  
    this.addBlock();
  }  

  // if (this.drawInitializer === 0 || this.blocksArray[this.blocksArray.length - 1].vy === 0) {  
  //   this.addBlock();
  // }  
  this.drawInitializer++;

}

Game.prototype.addBlock = function() {
  var block = new Square(this.ctx);
  this.blocksArray.push(block);
}

Game.prototype.move = function() {
  var currentBlock = this.blocksArray[this.blocksArray.length - 1];
  currentBlock.move();

  var blocksArrayCloned = this.blocksArray;
  var collision = blocksArrayCloned.filter(function(blocksToCollideWith){
    return blocksToCollideWith.y === currentBlock.y + currentBlock.h
    && blocksToCollideWith.x === currentBlock.x;
  });

  if (collision[0]) {
    currentBlock.vy = 0;
  }

  if (this.blocksArray[this.blocksArray.length - 1].vy === 0) {  
    this.counterArray[currentBlock.x / SQUARE_SIZE][currentBlock.y / SQUARE_SIZE] = 1; 
    this.addBlock();
  }  
}


Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

