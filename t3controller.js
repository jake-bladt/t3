t3Controller = function() {};

(function(gameController) {

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

  gameController.startOnePlayerGame = function() {
    this.startNewGame();
    this.player1 = { 
  	  symbol: "X",
  	  squares: [] 
    };
    this.player2 = { 
  	  symbol: "O",
  	  squares: [],
  	  ai: this.ai
    };

    this.player2.ai.setPlayers(this.player2, this.player1);
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
	
})(t3Controller);
