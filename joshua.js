let joshua = {};

 (function(joshua, $) {
  var CENTER_SQUARE =  4;

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

  joshua.centerIsFree = function() {
    return (this.whoHasSquare(CENTER_SQUARE) === this.anybody) ? CENTER_SQUARE : null 
  };

  joshua.denyMost = function(player) {
    var avail = this.gameData.availableSquares;
    var maxCount = 0;
    var square = null;
    for(i = 0; i < avail.length; i++) {
      var count = 0;
      for(j = 0; j < player.possibleWins.length; j++) {
        if(player.possibleWins[j].indexOf(avail[i]) > 0) count++;
      };
      if(count >= maxCount) {
        square = avail[i];
        maxCount = count;
      }
    }
    return (maxCount > 1) ? square : null;
  };

  joshua.pushForWin = function(player) {
    if(player.possibleWins.length > 0) {
      var canWin = player.possibleWins[0];
      for(i = 2; i >= 0; i--) {
        if(this.gameData.availableSquares.indexOf(canWin[i]) >= 0) {
          return canWin[i];
        } else {
          return null;
        }
      }
    }
};

  joshua.pickSquare = function() {
    this.evaluateBoard();
    var win = this.hasWinningPlay(this.me);
    if(win !== null) return win;

    var block = this.hasWinningPlay(this.opponent);
    if(block !== null) return block;

    var center = this.centerIsFree();
    if(center !== null) return center;

    var push = this.pushForWin(this.me);
    if(push !== null) return push;

    var deny = this.denyMost(this.opponent);
    if(deny !== null) return deny;

    return this.gameData.availableSquares[0];
  };
})(joshua, jQuery);
