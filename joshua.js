var joshua = function() {};

 (function(joshua, $) {
  var CENTER_SQUARE =  4;
  var CORNER_SQUARES = [0, 2, 6, 8];
  var SIDE_SQUARES =   [1, 3, 5, 7];

  joshua.setPlayers = function(me, opponent) {
    this.me = me;
    this.opponent = opponent;
    this.nobody = function() {};
    this.anybody = function() {};
  };

  joshua.whoHasSquare = function(squareNumber) {
    if(this.me.squares.indexOf(squareNumber) > -1) return this.me;
    if(this.opponent.squares.indexOf(squareNumber) > -1) return this.opponent;
    return this.anybody;
  };

  joshua.whoHasSet = function(winningSet) {
    var setOwner = joshua.whoHasSquare(winningSet[0]);
    for(i = 1; i <= 2; i++) {
      var squareOwner = joshua.whoHasSquare(winningSet[i]);
      if(setOwner === this.anybody) {
        setOwner = squareOwner;
      } else if(squareOwner !== setOwner && squareOwner !== this.anybody) {
        setOwner = this.nobody;
      };
    };
    return setOwner;
  };

  joshua.evaluateBoard = function() {
    this.me.possibleWins = [];
    this.opponent.possibleWins = [];
    this.nobody.possibleWins = [];
    this.anybody.possibleWins = [];

    $(this.gameData.winningSets).each(function() {
      var setOwner = joshua.whoHasSet(this);
      setOwner.possibleWins.push(this);
    });
  };

  joshua.setHasWin = function(player, winningSet) {
    var squareCount = 0;
    var emptySpot = null;
    for(i = 0; i < 3; i++) {
      if(joshua.whoHasSquare(winningSet[i]) === player) {
        squareCount++;
      } else {
        emptySpot = winningSet[i];
      };
    };
    if(squareCount == 2) return emptySpot;
    return null;
  };

  joshua.hasWinningPlay = function(player) {
    var ret = null;
    $(player.possibleWins).each(function() {
      var winner = joshua.setHasWin(player, this);
      if(winner) ret = winner;
    });
    return ret;
  }

  joshua.pickSquare = function() {
    this.evaluateBoard();
    var win = this.hasWinningPlay(this.me);
    if(win !== null) return win;

    var block = this.hasWinningPlay(this.opponent);
    if(block !== null) return block;

    return this.gameData.availableSquares[0];
  };
})(joshua, jQuery);
