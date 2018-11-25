function Background(ctx) {
  this.ctx = ctx;
  this.x = 0;
  this.y = 0;
  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;
}

Background.prototype.draw = function() {
  this.ctx.fillStyle = '#dcdcdc';
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.w, this.h);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.strokeStyle = 'white';
  this.ctx.beginPath();
  this.ctx.moveTo(150, 0);
  this.ctx.lineTo(150,600)
  this.ctx.stroke();
  this.ctx.closePath();

}
