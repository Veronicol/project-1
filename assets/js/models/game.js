function Game(canvas) {
  this.ctx = canvas.getContext('2d');

  this.background = new Background(this.ctx);
  this.square = new Square(this.ctx);

  // this.blocksArray = [];
  // this.drawCount = 0;
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
  this.square.draw();
  // this.blocksArray.forEach(function(block) {
  //   block.draw();
  // });
  // this.drawCount++;

  // if (this.drawCount % 100 === 0) {
  //   this.addBlock();
  //   this.drawCount = 0;
  // }  
}

// Game.prototype.addBlock = function() {
//   var block = new Square(this.ctx);
//   this.blocksArray.push(block);
// }


Game.prototype.move = function() {
  this.square.move();
  // this.blocksArray.forEach(function(block) {
  //   block.move();
  // })
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}