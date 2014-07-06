t3 = function() {};
t3.gameView = function() {};
t3.gameController = function() {};

(function($, gameView, gameController) {
  gameController.player1 = { symbol: "X" };
  gameController.player2 = { symbol: "O" };
  gameController.activePlayer = gameController.player1;

  gameController.togglePlayer = function() {
    gameController.activePlayer = (gameController.activePlayer === gameController.player1) ? 
      gameController.player2 : gameController.player1;
  };

  // TODO - These should be scoped to the view.
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
    var x = (square.col + 0.5) * SQUARE_SIZE;
    var y = (square.row + 0.5) * SQUARE_SIZE;

    var context = gameView.getDrawingContext();
    context.font = "200pt Calibri";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(symbol, x, y);
  };

  gameView.getSquare = function(x, y) {
  	var col = Math.floor(x / SQUARE_SIZE);
  	var row = Math.floor(y / SQUARE_SIZE);
  	var ndx = col + row * 3;
    return {
      row: row,
      col: col,
      index: ndx
    }; 
  };

  gameView.drawBoard = function() {
    gameView.drawLine(FIRST_DIVISION,  MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY);
    gameView.drawLine(SECOND_DIVISION, MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY);
    gameView.drawLine(MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY,    FIRST_DIVISION);
    gameView.drawLine(MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY,    SECOND_DIVISION);
  };

  gameView.handleClick = function(e) {
    var square = gameView.getSquare(e.clientX - BODY_PADDING, e.clientY - BODY_PADDING);
    gameView.drawSymbol(gameController.activePlayer.symbol, square);
    gameController.togglePlayer();
  };

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas");
    $("#gameCanvas").click(function(e) { gameView.handleClick(e) });

    gameView.drawBoard();
  });

})(jQuery, t3.gameView, t3.gameController);
