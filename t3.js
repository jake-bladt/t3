var t3 = function() {};
t3.gameView = function() {};

(function($, gameView, gameController, ai) {

  // TODO - Separate out game data from controller.
  ai.gameData = gameController;
  gameController.ai = ai;

  // TODO - These should be scoped to the view.
  var BODY_PADDING = 20;
  var MIN_BOUNDARY = 0;
  var SQUARE_SIZE = 200;
  var FIRST_DIVISION =  SQUARE_SIZE;
  var SECOND_DIVISION = SQUARE_SIZE * 2;
  var MAX_BOUNDARY =    SQUARE_SIZE * 3;

  gameView.controller = gameController;

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
    this.drawLine(FIRST_DIVISION,  MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY);
    this.drawLine(SECOND_DIVISION, MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY);
    this.drawLine(MIN_BOUNDARY,    FIRST_DIVISION,  MAX_BOUNDARY,    FIRST_DIVISION);
    this.drawLine(MIN_BOUNDARY,    SECOND_DIVISION, MAX_BOUNDARY,    SECOND_DIVISION);
  };

  gameView.selectSquare = function(square) {
      this.drawSymbol(this.controller.activePlayer.symbol, square);
      this.controller.claimSquare(square);
      this.controller.togglePlayer();
      this.endTurn();
  };

  gameView.endTurn = function() {
  	if(this.controller.activePlayer.ai) {
  	  // TODO - separate out the logic for getting rows and col from index.
  	  var ndx = this.controller.activePlayer.ai.pickSquare();
      var aiSquare = { 
      	index: ndx,
      	col: ndx % 3,
      	row: Math.floor(ndx / 3) 
      };

      this.selectSquare(aiSquare);
  	} else {
  	  this.gameStatus = this.controller.gameStatus();
      this.statusArea.text(this.gameStatus.message);
      if(this.gameStatus.status != 'in progress') {
        gameView.launchForm.show();	
      }
  	}
  };

  gameView.handleCanvasClick = function(e) {
    var square = this.getSquare(e.clientX - BODY_PADDING, e.clientY - BODY_PADDING);
    if(this.gameStatus.status == "in progress" && 
       this.controller.availableSquares.indexOf(square.index) >= 0) {
       	this.selectSquare(square);
    };
  };

  gameView.startGame = function(gameStart) {
    this.statusArea.show();
    this.launchForm.hide();
    this.clearBoard();
    gameStart();
    this.drawBoard();
    this.endTurn();
  };

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas");
  	gameView.statusArea = $("#gameStatus");
    gameView.launchForm = $("#startGame");

    gameView.canvas.click(function(e) { gameView.handleCanvasClick(e) });
    $('#twoPlayer').click(function(e) { 
      gameView.startGame(function() {
      	gameView.controller.startTwoPlayerGame();
      });
    });
    $('#onePlayer').click(function(e) { 
      gameView.startGame(function() {
      	gameView.controller.startOnePlayerGame();
      });
    });
    
  	gameView.statusArea.hide();
    gameView.drawBoard();
  });

})(jQuery, t3.gameView, t3Controller, joshua);
