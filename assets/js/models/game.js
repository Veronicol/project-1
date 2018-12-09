function Game(canvas) {
  this.ctx = canvas.getContext('2d');
  this.intervalId = 1;
  
  this.background = new Background(this.ctx);
  
  this.secondaryCanvas = document.getElementById("secondary-canvas");
  this.secondCtx = this.secondaryCanvas.getContext('2d');
  this.nextBlockBg = new Background(this.secondCtx);
  
  this.gameboard = GAMEBOARD.map(function(elem) {
    var newElem = Object.assign([],elem);
    return newElem;
  });
    
  this.intervalFall = FALL_INTERVAL;
  this.blocksAcumArr = [];
  this.createNewBlock();
  
  this.helper = new Helpers();

  this.blocksCounter = 0;
  this.currentLinesRemoved = 0
  this.linesRemoved = 0;
  this.score = 0;
  
  this.isPaused = false;
  this.onKeyDown();
}

Game.prototype.start = function() {
  if (!this.isRunning()) {
    this.intervalId = setInterval(function() {
      if ( this.isPaused === false ) {

        this.clear();
        this.drawAll();
        this.moveAll();
  
        if (this.checkGameOver()) {
          this.gameOver();
          this.updateFinalScore();
          this.getPlayerName();
        }
      }
    }.bind(this), DRAW_INTERVAL_MS)
  } 
} 


Game.prototype.drawAll = function() {
  this.background.draw();
  this.nextBlockBg.draw();
  this.drawGameboard();


  this.currentBlock.draw(this.currentBlock.blockMatrix);
  this.nextBlock.draw(this.nextBlock.blockMatrix);

  this.countClearedLines();
  this.updateLinesScore();
}

Game.prototype.checkGameOver = function() {
  return this.gameboard[0].some(function(number) {
    return number !== 0;
  })
};

Game.prototype.moveAll = function() {
  this.clearLines;
  this.currentBlock.move();
  this.collitionY();
  this.colltionXleft();
  this.colltionXright();
  
  if ( this.currentBlock.stopY ) {
    this.addBlocktoBg();
    this.createNewBlock();
  }
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Game.prototype.isRunning = function() {
  return this.intervalId !== undefined;
}

Game.prototype.gameOver = function() {
  clearInterval(this.intervalId);
  this.intervalId = undefined;

  var endContainer = document.querySelector('#end-container');
  endContainer.classList.add('active');

  // if (confirm("GAME OVER! Play again?")) {
  //   location.reload();
  // }
};

Game.prototype.getNewBlock = function() {
  this.newBlockMatrix = BLOCKS_ARRAY[Math.floor(Math.random() * BLOCKS_ARRAY.length)] ;
  return this.newBlockMatrix;
}

Game.prototype.createNewBlock = function() {
  if ( this.blocksAcumArr.length === 0){
    this.newBlockMatrix = this.getNewBlock();
    this.blocksAcumArr.push(this.newBlockMatrix);
    this.nextBlock = new Block(this.secondCtx, 30, 30, this.newBlockMatrix, this.intervalFall);
    this.currentBlock = new Block(this.ctx, 120, 0,this.getNewBlock(), this.intervalFall);
  } else {
    this.decreaseInterval();
    this.newBlockMatrix = this.getNewBlock();
    this.nextBlock = new Block(this.secondCtx, 30, 30, this.newBlockMatrix, this.intervalFall);
    this.blocksAcumArr.push(this.newBlockMatrix);
    var currentBlockMatrix = this.blocksAcumArr[this.blocksAcumArr.length - 2];
    this.currentBlock = new Block(this.ctx, 120, 0, currentBlockMatrix, this.intervalFall);
  }
  this.blocksCounter++;
}

Game.prototype.drawGameboard = function() {
  for (i = 0; i <= this.gameboard.length - 1; i++) {
    var y = i * SQUARE_SIZE;

    for (j = 0; j <= this.gameboard[i].length -1; j++) { 
      var x = j * SQUARE_SIZE;
      if (this.gameboard[i][j] !== 0 ) {

        square = new Square(this.ctx);
        square.draw(x, y, this.helper.getColor(this.gameboard[i][j]));
      }
    }
  }
}

Game.prototype.clearLines = function() {
  for (i = 0; i <= this.gameboard.length - 1; i++) {

    var line = this.gameboard[i];
    var counterElements = 0;
  
    for (j = 0; j <= this.gameboard[i].length -1; j++) {   
      if (line[j] != 0) {
        counterElements++;
      }
    };
  
    if (counterElements === this.gameboard[i].length) {
      this.gameboard.splice(i,1);
      this.gameboard.unshift(EMPTY_GAMEBOARD_LINE);
      this.currentLinesRemoved++;

      for (i = 0; i <= this.gameboard.length - 1; i++) {

        var line = this.gameboard[i];
      
        for (j = 0; j <= this.gameboard[i].length -1; j++) {   
          if (line[j] != 0) {
            line[j].y += line[j].w;
          }
        };
      };
    };
  };
}

Game.prototype.countClearedLines = function() {
  for (var i= 0; i < 4; i++) {
    this.clearLines();
  }
  this.linesRemoved += this.currentLinesRemoved;
  this.score = this.score + this.helper.scoreValues(this.currentLinesRemoved);
  this.addCheers();
  this.currentLinesRemoved = 0;
}

Game.prototype.addBlocktoBg = function() {
  for (i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++){
      if (this.currentBlock.blockMatrix[i][j] !== 0 ) {
        this.gameboard[( this.currentBlock.y / SQUARE_SIZE ) + i ]
        [( this.currentBlock.x / SQUARE_SIZE ) + j] = this.currentBlock.blockMatrix[i][j];
      }
    }
  }
}

Game.prototype.collitionY = function() {

  for ( i = this.currentBlock.blockMatrix.length - 1; i >= 0; i-- ) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++ ) {
      if ( this.currentBlock.blockMatrix[i][j] !== 0 &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== undefined &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE]
        [(this.currentBlock.x + (j * SQUARE_SIZE)) / SQUARE_SIZE] !== 0 )  {

        this.currentBlock.stopY = true;
      }
    }
  }
}

Game.prototype.colltionXleft = function() {
  for ( i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++ ) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++ ) {
      if ( this.currentBlock.blockMatrix[i][j] !== 0 &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== undefined &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE]
        [(this.currentBlock.x + ((j - 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== 0 ) {
          this.currentBlock.stopXleft = true;
          var xInit = this.currentBlock.x;
        } 
      if ( this.currentBlock.stopXleft === true && xInit !== this.currentBlock.x ) {
        this.currentBlock.stopXleft = false;
      }
    }
  }
}

Game.prototype.colltionXright = function() {
  for ( i = 0; i <= this.currentBlock.blockMatrix.length - 1; i++ ) {
    for (j = 0; j <= this.currentBlock.blockMatrix[i].length - 1; j++ ) {
      if ( this.currentBlock.blockMatrix[i][j] !== 0 &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== undefined &&
        this.gameboard[(this.currentBlock.y + ((i + 1) * SQUARE_SIZE)) / SQUARE_SIZE]
        [(this.currentBlock.x + ((j + 1) * SQUARE_SIZE)) / SQUARE_SIZE] !== 0 ) {
          this.currentBlock.stopXright = true;
          var xInit = this.currentBlock.x;
        } 
      if ( this.currentBlock.stopXright === true && xInit !== this.currentBlock.x ) {
        this.currentBlock.stopXright = false;
      }
    }
  }
}

Game.prototype.decreaseInterval = function() {
  if ( this.blocksCounter !== 0 && this.blocksCounter % 10 === 0 ) {
    this.intervalFall = this.intervalFall / 2;
  }
}

Game.prototype.getScore = function(linesRemoved, score) {
  var currentRoundScore = this.helper.scoreValues(linesRemoved);
  var newScore = score + currentRoundScore;
  return newScore;
}

Game.prototype.onKeyDown = function() {
  document.addEventListener('keydown', function(event) {
    if ( event.keyCode === KEY_SPACE ) {
      console.log("prueba espaciador");
      this.isPaused = true;
      console.log("estado Pausa: ", this.isPaused);
      // clearInterval(this.intervalId);
      // this.intervalId = undefined;
    
    }
  });
}

Game.prototype.updateLinesScore = function() {
  document.querySelector('#lines-counter').textContent = this.linesRemoved;
  document.querySelector('#score').textContent = this.score;
}

Game.prototype.addCheers = function() {
  if (this.currentLinesRemoved !== 0 ) {
    document.querySelector('#cheer-message').textContent = this.helper.cheerMessage(this.currentLinesRemoved);
    document.querySelector('#cheer-score').textContent = this.helper.cheerScore(this.currentLinesRemoved);
    setTimeout(function(){
      document.querySelector('#cheer-message').innerHTML = '';
      document.querySelector('#cheer-score').innerHTML = '';
    }, 1500);
  }
}

Game.prototype.updateFinalScore = function() {
  document.querySelector('#total-score').textContent = this.score;
}

Game.prototype.getPlayerName = function() {
  var scoresArr = [];
  document.querySelector('#save-name').addEventListener('click', function() {
    var playerName = document.querySelector('#name').value;
    var finalScore = document.querySelector('#total-score').textContent;
    this.showScoreTable();

    if ( localStorage.getItem('scores')) {
      scoresArr = JSON.parse(localStorage.getItem('scores'));
    }
    scoresArr.push({'name': playerName, 'score': finalScore});
    localStorage.setItem('scores', JSON.stringify(scoresArr));

    this.sortPlayers(scoresArr);

    for (var i = 0; i < 10; i++ ) {
      var newDivName = document.createElement('div'); 
      var newDivScore = document.createElement('div'); 

      var newPlayer = document.createTextNode((i + 1) + ". " + scoresArr[i].name); 
      var newScorePlayer = document.createTextNode(scoresArr[i].score+ " pts"); 

      console.log(scoresArr[i].score+ " pts");

      newDivName.appendChild(newPlayer); 
      newDivScore.appendChild(newScorePlayer);
    
      var player = document.querySelector('#score-player');
      player.appendChild(newDivName);

      var scorePlayer = document.querySelector('#score-pts');
      scorePlayer.appendChild(newDivScore);
    }

  }.bind(this));


  this.playAgain();
}

Game.prototype.sortPlayers = function(array) {
  array.sort(function(a, b) {
    if (Number(a.score) < Number(b.score)) {
      return 1;
    };
    if (Number(a.score) > Number(b.score)) {
      return -1;
    };
    return 0;
  });
}

Game.prototype.showScoreTable = function() {
  var endContainer = document.querySelector('#end-container');
  endContainer.classList.remove('active');
  var scoreTable = document.querySelector('#score-container');
  scoreTable.classList.add('active');
}

Game.prototype.playAgain = function() {
  document.querySelector('#play-again').addEventListener('click', function() {
    location.reload();
  });
}

// Game.prototype.updateScoreTable = function() {
  
//   for (var i = 0; i < 10; i++ ) {
//     var newDiv = document.createElement('div'); 
//     var newPlayer = document.createTextNode((i + 1) + ". " + scoresArr[i].name); 
//     newDiv.appendChild(newPlayer); 
  
//     var player = document.querySelector('#score-player');
//     player.appendChild(newDiv);
//   }
// }