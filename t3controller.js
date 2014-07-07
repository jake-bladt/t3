t3Controller = function() {};

(function(gameController) {

  gameController.winningSets = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  gameController.startNewGame = function() {
    gameController.availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.player1 = { 
  	  symbol: "X",
  	  squares: [] 
    };
    this.player2 = { 
  	  symbol: "O",
  	  squares: []
    };
    this.activePlayer = this.player1;
    this.currentStatus =this.getGameStatus();

    this.view.clearBoard();
    this.view.drawBoard();
    this.view.signalGameStart();
    this.view.showStatus(this.currentStatus.message);
  };

  gameController.startTwoPlayerGame = function() {
    this.startNewGame();
  };

  gameController.startOnePlayerGame = function() {
    this.startNewGame();
    this.player2.ai = this.ai;
    this.ai.setPlayers(this.player2, this.player1);
  };

  gameController.getGameStatus = function() {
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

  gameController.endTurn = function() {
  	this.currentStatus = this.getGameStatus();
  	if(this.activePlayer.ai && this.currentStatus.status == 'in progress') {
  	  // TODO - separate out the logic for getting rows and col from index.
  	  var ndx = this.activePlayer.ai.pickSquare();
      var aiSquare = { 
      	index: ndx,
      	col: ndx % 3,
      	row: Math.floor(ndx / 3) 
      };

      this.claimSquare(aiSquare);
  	} else {
      this.view.showStatus(this.currentStatus.message);
  	}

    if(this.currentStatus.status != 'in progress') {
      this.view.enableNewGame();	
    }
  };

  gameController.togglePlayer = function() {
    this.activePlayer = (this.activePlayer === this.player1) ? 
      this.player2 : this.player1;
  };

  gameController.claimSquare = function(square) {
  	var chosenIndex = parseInt(square.index);
    var availableIndex = this.availableSquares.indexOf(chosenIndex);

    if(availableIndex > -1 && this.currentStatus.status == 'in progress') {
  	  this.availableSquares.splice(availableIndex, 1);
      this.activePlayer.squares.push(chosenIndex);
      this.view.drawSymbol(this.activePlayer.symbol, square);
      this.togglePlayer();
      this.endTurn();
    }
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
	
})(t3Controller);
