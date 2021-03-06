function Square(ctx) {
  this.ctx = ctx;
  this.w = SQUARE_SIZE;
  this.h = SQUARE_SIZE;
}

Square.prototype.draw = function(x, y, color) {
  this.ctx.fillStyle = color;
  this.ctx.beginPath();
  this.ctx.rect(x, y, this.w, this.h);
  this.ctx.fill();
  this.ctx.lineWidth = 1;
  this.ctx.strokeStyle = "white";
  this.ctx.stroke();
  this.ctx.closePath();
}

