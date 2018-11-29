function Square(ctx) {
  this.ctx = ctx;
  this.x = this.ctx.canvas.width / 2 - SQUARE_SIZE;
  this.y = 0;
  this.w = SQUARE_SIZE;
  this.h = SQUARE_SIZE;

  this.stopY = false;
  this.moveIntervalCount = 0;

  this.setListeners();
}

Square.prototype.draw = function() {
  this.ctx.fillStyle = "red";
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.w, this.h);
  this.ctx.fill();
  this.ctx.lineWidth = 1;
  this.ctx.strokeStyle = "white";
  this.ctx.stroke();
  this.ctx.closePath();
}

Square.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Square.prototype.onKeyDown = function(event) {
  if (this.stopY === true) { return; }
  
  switch (event.keyCode) {
    case KEY_RIGHT:
      this.x += SQUARE_SIZE;
      break;
    case KEY_LEFT:
      this.x -= SQUARE_SIZE;
      break;
    // case KEY_UP:     //cuando tenga bloques, servirá para girarlos
    //   this.rotate();
    //   break;
    case KEY_DOWN:  
      this.y += this.h;
      break;
  }
};

Square.prototype.onKeyUp = function(event) {
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

Square.prototype.move = function() {
  this.moveIntervalCount++;
  if (this.moveIntervalCount % FALL_INTERVAL === 0)
  this.y += this.h;

  if (this.y >= this.ctx.canvas.height - this.h) { 
    this.y = this.ctx.canvas.height - this.h;
    this.stopY = true;
  }

  if (this.x >= this.ctx.canvas.width - this.w) {
    this.x = this.ctx.canvas.width - this.w;
  }

  if (this.x <= 0) {
    this.x = 0;
  }
}
