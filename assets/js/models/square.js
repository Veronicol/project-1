function Square(ctx) {
  this.ctx = ctx;
  this.x = this.ctx.canvas.width / 2 - SQUARE_SIZE / 2;
  this.y = 0;
  this.w = SQUARE_SIZE;
  this.h = SQUARE_SIZE;

  this.x0 = this.x;

  this.vx = 0;
  this.vy0 = 0.25;
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
      if (this.x === this.x0) {
        this.vx = 15;
        this.x += this.vx;
      } else {
        this.vx = 30;
        this.x += this.vx;
      }
      break;
    case KEY_LEFT:
      if (this.x === this.x0) {
        this.vx = -15;
        this.x += this.vx;
      } else {
        this.vx = -30;
        this.x += this.vx;
      }
      break;
    // case KEY_UP:     //cuando tenga bloques, servirá para girarlos
    //   this.rotate();
    //   break;
    case KEY_DOWN:
      this.vy += 5;
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

  if (this.y >= this.ctx.canvas.height - SQUARE_SIZE) { // todo lo que tenga que ver con el movimiento en y lo paso a Game para controlar las colisiones
    this.y = this.ctx.canvas.height - SQUARE_SIZE;
    this.vy = 0;
  }
  if (this.x >= this.ctx.canvas.width - SQUARE_SIZE) {
    this.x = this.ctx.canvas.width - SQUARE_SIZE;
  }
  if (this.x <= 0) {
    this.x = 0;
  }
}

