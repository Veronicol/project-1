
function Helpers() {

  Helpers.prototype.getColor = function(number) {
    switch (number) {
      case 1:
        return "#fcfca8";
        break;
      case 2:
        return "#f8aff2";
        break;
      case 3:
        return "#8c8af8";
        break;
      case 4:
        return "rgb(236, 81, 70)";
      case 5:
        return "#b0fabb";
        break;
      case 6:
        return "#ffd95d";
        break;
      case 7:
        return "#afc2f8";
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