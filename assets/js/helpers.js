
function Helpers() {

  Helpers.prototype.getColor = function(number) {
    switch (number) {
      case 1:
        return "#ece35e";
        break;
      case 2:
        return "#f16ac0";
        break;
      case 3:
        return "#378cf9";
        break;
      case 4:
        return "#ec5146";
      case 5:
        return "#4dc162";
        break;
      case 6:
        return "#f9af42";
        break;
      case 7:
        return "#39c4d4";
    }
  }

  Helpers.prototype.scoreValues = function(lines) {
    switch (lines) {
      case 0:
        return 0;
      case 1:
        return 50;
        break;  
      case 2:
        return 150;
        break;
      case 3:
        return 400;
        break;
      case 4:
        return 600;
        break;
    }
  }

  Helpers.prototype.cheerMessage = function(number) {
    switch (number) {
      case 1:
        return 'Are you kidding me?';
        break;  
      case 2:
        return 'You can do better...';
        break;
      case 3:
        return 'Well done!';
        break;
      case 4:
        return 'Simply Perfect!';
        break;
    }
  }

  Helpers.prototype.cheerScore = function(number) {
    switch (number) {
      case 1:
        return '1 line - 50 pts';
        break;  
      case 2:
        return '2 lines - 150 pts';
        break;
      case 3:
        return '3 lines - 400 pts';
        break;
      case 4:
        return '4 lines - 600 pts';
        break;
    }
  }

  this.sounds = [
      'pop.m4a',
      'Stranger_Things.m4a',
  ];
  
  
  Helpers.prototype.play = function(track){
    new Audio("./audio/" + this.sounds[track]).play();
  };

}