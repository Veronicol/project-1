function Square(ctx) {
  this.ctx = ctx;
  this.x = this.ctx.canvas.width / 2 - SQUARE_SIZE / 2;
  this.y = 0;
  this.w = SQUARE_SIZE;
  this.h = SQUARE_SIZE;

  this.vx = 0;
  this.vy = 0;
  this.gravity = 0.25;

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
  switch (event.keyCode) {
    case KEY_RIGHT:
      this.vx = 3;
      break;
    case KEY_LEFT:
      this.vx = -3;
      break;
    // case KEY_UP:
    //   this.rotate();
    //   break;
    case KEY_DOWN:
      this.vy += 10;
      break;
  }
};

Square.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
    case KEY_LEFT:
      this.vx = 0;
      break;
  }
};

Square.prototype.move = function() {
  this.y += this.gravity + this.vy;
  this.x += this.vx;

  if (this.y >= this.ctx.canvas.height - SQUARE_SIZE) {
    this.y = this.ctx.canvas.height - SQUARE_SIZE;
  }
  if (this.x >= this.ctx.canvas.width - SQUARE_SIZE) {
    this.x = this.ctx.canvas.width - SQUARE_SIZE;
  }
  if (this.x <= 0) {
    this.x = 0;
  }
}

