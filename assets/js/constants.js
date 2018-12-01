
var DRAW_INTERVAL_MS = 1000 / 60;
var FALL_INTERVAL = 60;

var SQUARE_SIZE = 30; // gameboard: 20 rows * 10 lines

var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_SPACE = 32;

var EMPTY_GAMEBOARD_LINE = [0,0,0,0,0,0,0,0,0,0];

var J_BLOCK = {
  matrix: [
    [1,1,1],
    [0,0,1],
    [0,0,0]
  ],
  color: "#fcfca8"
}

var L_BLOCK = {
  matrix: [
    [1,1,1],
    [1,0,0],
    [0,0,0]
  ],
  color: "#f8aff2"
}

var O_BLOCK  = {
  matrix: [
    [1,1],
    [1,1],
  ],
  color: "#8c8af8"
}

var I_BLOCK = {
  matrix: [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  color: "#fd997a"
}

var T_BLOCK = {
  matrix: [
    [1,1,1],
    [0,1,0],
    [0,0,0]
  ],
  color: "#b0fabb"
}

var Z_BLOCK = {
  matrix: [
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ],
  color: "#ffd95d"
}

var S_BLOCK = {
  matrix: [
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
  color: "#afc2f8"
}




