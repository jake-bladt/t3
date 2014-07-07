t3View = function() {};

(function(gameView) {
  var BODY_PADDING = 20;
  var MIN_BOUNDARY = 0;
  var SQUARE_SIZE = 200;
  var FIRST_DIVISION =  SQUARE_SIZE;
  var SECOND_DIVISION = SQUARE_SIZE * 2;
  var MAX_BOUNDARY =    SQUARE_SIZE * 3;

  gameView.getDrawingContext = function() {
    return this.canvas[0].getContext("2d");
  };

  gameView.drawLine = function(x1, y1, x2, y2) {
    var context = this.getDrawingContext();
    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  gameView.clearBoard = function() {
    var context = this.getDrawingContext();
    context.clearRect(MIN_BOUNDARY, MIN_BOUNDARY, MAX_BOUNDARY, MAX_BOUNDARY);
  };

  gameView.drawSymbol = function(symbol, square) {
    var x = (square.col + 0.5) * SQUARE_SIZE;
    var y = (square.row + 0.5) * SQUARE_SIZE;

    var context = this.getDrawingContext();
    context.font = "200pt Calibri";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(symbol, x, y);
  };

  gameView.getSquare = function(x, y) {
  	var col = Math.floor((x - BODY_PADDING) / SQUARE_SIZE);
  	var row = Math.floor((y - BODY_PADDING) / SQUARE_SIZE);
  	var ndx = col + row * 3;
    return {
      row: row,
      col: col,
      index: ndx
    }; 
  };

  gameView.drawBoard = function() {
    this.drawLine(FIRST_DIVISION,  MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY);
    this.drawLine(SECOND_DIVISION, MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY);
    this.drawLine(MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY,    FIRST_DIVISION);
    this.drawLine(MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY,    SECOND_DIVISION);
  };

  gameView.signalGameStart = function() {
    this.statusArea.show();
    this.launchForm.hide();
  };

  gameView.enableNewGame = function() {
    this.launchForm.show();
  };

  gameView.showStatus = function(statusMessage) {
    this.statusArea.text(statusMessage);
  };

})(t3View);
