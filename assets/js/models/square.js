function Square(ctx) {
  this.ctx = ctx;
  this.x = this.ctx.canvas.width / 2 - SQUARE_SIZE;
  this.y = 0;
  this.w = SQUARE_SIZE;
  this.h = SQUARE_SIZE;

  this.x0 = this.x;

  this.vx = 0;
  this.vy0 = 0.5;
  this.vy = this.vy0

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
  if (this.vy === 0) { return; }

  switch (event.keyCode) {
    case KEY_RIGHT:
      this.vx = 30;
      this.x += this.vx;
      break;
    case KEY_LEFT:
      this.vx = -30;
      this.x += this.vx;
      break;
    // case KEY_UP:     //cuando tenga bloques, servirá para girarlos
    //   this.rotate();
    //   break;
    // case KEY_DOWN:  //no funcionan las colisiones con KEY_DOWN!!
    //   this.vy += 5;
      break;
  }
};

Square.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
    case KEY_LEFT:
      this.vx = 0;
      break;
      case KEY_DOWN:
      this.vy = this.vy0;
      break;
  }
};

Square.prototype.move = function() {
  this.y += this.vy;

  if (this.y >= this.ctx.canvas.height - this.h) { 
    this.y = this.ctx.canvas.height - this.h;
    this.vy = 0;
  }

  if (this.x >= this.ctx.canvas.width - this.w) {
    this.x = this.ctx.canvas.width - this.w;
  }

  if (this.x <= 0) {
    this.x = 0;
  }
}

// Square.prototype.stop = function(block) {
//   return this.y + this.h >= block.y
// }

