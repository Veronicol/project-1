function Game(canvas) {
  this.ctx = canvas.getContext('2d');

  this.background = new Background(this.ctx);
  this.square = new Square(this.ctx);

  this.blocksArray = [];
  this.drawCount = 0;  // no lo necesito para nada de momento ¿?

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
  // this.square.draw();
  this.blocksArray.forEach(function(block) {
    block.draw();
  });
  if (this.drawCount === 0 || this.blocksArray[this.blocksArray.length - 1].vy === 0) {  // la condición tiene que ser "si el bloque actual se ha parado"
    this.addBlock();
  //   this.drawCount = 0;  // no lo necesito para nada de momento ¿?
  }  
  this.drawCount++;

}

Game.prototype.addBlock = function() {
  var block = new Square(this.ctx);
  this.blocksArray.push(block);
}


Game.prototype.move = function() {
  // this.square.move();
  var currentBlock = this.blocksArray[this.blocksArray.length - 1];
  currentBlock.move();
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}