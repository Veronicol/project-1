
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

}