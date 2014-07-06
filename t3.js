t3 = function() {};
t3.gameView = function() {};
t3.gameController = function() {};

(function($, gameView, gameController) {

  gameView.getDrawingContext = function() {
    return gameView.canvas.getContext("2d");
  };

  gameView.drawLine = function(x1, y1, x2, y2) {
    var context = gameView.getDrawingContext();
    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  gameView.drawBoard = function() {
    gameView.drawLine(200, 0, 200, 600);
    gameView.drawLine(400, 0, 400, 600);
    gameView.drawLine(0, 200, 600, 200);
    gameView.drawLine(0, 400, 600, 400);
  };

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas")[0];
    gameView.drawBoard();
  });

})(jQuery, t3.gameView, t3.gameController);
