
var DRAW_INTERVAL_MS = 1000 / 60;
var FALL_INTERVAL = 60;

var SQUARE_SIZE = 30; // gameboard: 20 rows * 10 lines

var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_SPACE = 32;

var EMPTY_GAMEBOARD_LINE = [0,0,0,0,0,0,0,0,0,0];

var J_BLOCK = [
    [1,1,1],
    [0,0,1],
    [0,0,0]
  ];

var L_BLOCK = [
    [2,2,2],
    [2,0,0],
    [0,0,0]
  ];

var O_BLOCK  = [
    [3,3],
    [3,3],
  ];

var I_BLOCK = [
    [0,0,0,0],
    [4,4,4,4],
    [0,0,0,0],
    [0,0,0,0]
  ];

var T_BLOCK = [
    [5,5,5],
    [0,5,0],
    [0,0,0]
  ];

var Z_BLOCK = [
    [6,6,0],
    [0,6,6],
    [0,0,0]
  ];

var S_BLOCK = [
    [0,7,7],
    [7,7,0],
    [0,0,0]
  ];




