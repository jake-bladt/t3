t3 = function() {};
t3.gameView = function() {};
t3.gameController = function() {};

(function($, gameView, gameController) {
  var FIRST_DIVISION = 200;
  var SECOND_DIVISION = 400;
  var MIN_BOUNDARY = 0;
  var MAX_BOUNDARY = 600;

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

  gameView.drawSymbol = function(symbol, square) {

  };

  gameView.getSquare = function(x, y) {

  };

  gameView.drawBoard = function() {
    gameView.drawLine(FIRST_DIVISION,  MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY);
    gameView.drawLine(SECOND_DIVISION, MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY);
    gameView.drawLine(MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY,    FIRST_DIVISION);
    gameView.drawLine(MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY,    SECOND_DIVISION);
  };

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas")[0];
    gameView.drawBoard();
  });

})(jQuery, t3.gameView, t3.gameController);
