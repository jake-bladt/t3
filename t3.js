t3 = function() {};
t3.gameView = function() {};
t3.gameController = function() {};

(function($, gameView, gameController) {
  var BODY_PADDING = 20;
  var MIN_BOUNDARY = 0;
  var SQUARE_SIZE = 200;
  var FIRST_DIVISION =  SQUARE_SIZE;
  var SECOND_DIVISION = SQUARE_SIZE * 2;
  var MAX_BOUNDARY =    SQUARE_SIZE * 3;

  gameView.getDrawingContext = function() {
    return gameView.canvas[0].getContext("2d");
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
  	var row = Math.floor(x / SQUARE_SIZE);
  	var col = Math.floor(y / SQUARE_SIZE);
    return row + col * 3;
  };

  gameView.drawBoard = function() {
    gameView.drawLine(FIRST_DIVISION,  MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY);
    gameView.drawLine(SECOND_DIVISION, MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY);
    gameView.drawLine(MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY,    FIRST_DIVISION);
    gameView.drawLine(MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY,    SECOND_DIVISION);
  };

  gameView.handleClick = function(e) {
    var square = gameView.getSquare(e.clientX - BODY_PADDING, e.clientY - BODY_PADDING);
    alert("Square " + square);
  };

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas");
    $("#gameCanvas").click(function(e) { gameView.handleClick(e) });

    gameView.drawBoard();
  });

})(jQuery, t3.gameView, t3.gameController);
