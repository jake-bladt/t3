t3 = function() {};
t3.gameController = function() {};
t3.gameView = function() {};

(function($, gameView, gameController) {

  gameController.winningSets = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  gameController.startNewGame = function() {
    gameController.availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };

  gameController.startTwoPlayerGame = function() {
    this.startNewGame();
    this.player1 = { 
  	  symbol: "X",
  	  squares: [] 
    };
    this.player2 = { 
  	  symbol: "O",
  	  squares: []
    };
    this.activePlayer = this.player1;
  };

  gameController.togglePlayer = function() {
    this.activePlayer = (this.activePlayer === this.player1) ? 
      this.player2 : this.player1;
  };

  gameController.claimSquare = function(square) {
  	var ndx = parseInt(square.index);
  	this.availableSquares.splice(this.availableSquares.indexOf(ndx), 1);
    this.activePlayer.squares.push(ndx);
  };

  gameController.getWinningPlayer = function() {
  	var ret = null;
    $(this.winningSets).each(function() {
      if(gameController.playerHasAll(gameController.player1, this)) ret = gameController.player1;
      if(gameController.playerHasAll(gameController.player2, this)) ret = gameController.player2;
    });
    return ret;
  };

  gameController.playerHasAll = function(player, squares) {
  	var ret = true;
    $(squares).each(function() {
      ret = ret && (player.squares.indexOf(parseInt(this)) >= 0);
    });
    return ret;
  };

  gameController.gameStatus = function() {
    winner = this.getWinningPlayer();
    if(winner) {
      status = "win";
      message = winner.symbol + " wins.";
    } else {
      if(this.availableSquares.length == 0) {
      	status = "draw";
      	message = "It's a draw.";
      } else {
      	status = "in progress";
      	message = this.activePlayer.symbol + "'s turn";
      }
    }

    return { 
      status:  status,
      message: message };
  };

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

  gameView.updateStatus = function() {
  	this.gameStatus = this.controller.gameStatus();
    this.statusArea.text(this.gameStatus.message);
  };

  gameView.handleCanvasClick = function(e) {
    var square = this.getSquare(e.clientX - BODY_PADDING, e.clientY - BODY_PADDING);
    if(this.gameStatus.status == "in progress" && 
       this.controller.availableSquares.indexOf(square.index) >= 0) {
      this.drawSymbol(this.controller.activePlayer.symbol, square);
      this.controller.claimSquare(square);
      this.controller.togglePlayer();
      this.updateStatus();
    };
  };

  gameView.startTwoPlayerGame = function(e) {
    this.statusArea.show();
    this.launchForm.hide();
    this.controller.startTwoPlayerGame();
    this.updateStatus();
  };

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas");
  	gameView.statusArea = $("#gameStatus");
    gameView.launchForm = $("#startGame");

    gameView.canvas.click(function(e) { gameView.handleCanvasClick(e) });
    $('#twoPlayer').click(function(e) { gameView.startTwoPlayerGame() });
    
  	gameView.statusArea.hide();
    gameView.drawBoard();
  });

})(jQuery, t3.gameView, t3.gameController);
