var joshua = function() {};

 (function(joshua) {
  var CENTER_SQUARE =  4;
  var CORNER_SQUARES = [0, 2, 6, 8];
  var SIDE_SQUARES =   [1, 3, 5, 7];

  joshua.setPlayers = function(me, opponent) {
    this.me = me;
    this.opponent = opponent;
  };

  joshua.evaluateBoard = function() {

  };

  joshua.pickSquare = function() { 
    return this.gameData.availableSquares[0];
  };
})(joshua);
