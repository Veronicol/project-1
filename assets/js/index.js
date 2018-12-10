window.onload = function() {
  var canvasElement = document.getElementById("main-canvas");
  var game = new Game(canvasElement);

  document.querySelector('#start').addEventListener('click', function() {
    var startContainer = document.querySelector('#start-container');
    startContainer.classList.remove('active');
    game.intervalId = undefined;
    game.start();
  })

}

