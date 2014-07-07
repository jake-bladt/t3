(function($, gameView, gameController, ai) {

  // TODO - Separate out game data from controller.
  ai.gameData = gameController;
  gameController.ai = ai;
  gameController.view = gameView;

  $(document).ready(function() {
  	gameView.canvas = $("#gameCanvas");
  	gameView.statusArea = $("#gameStatus");
    gameView.launchForm = $("#startGame");
    gameView.drawBoard();

    gameView.canvas.click(function(e) { 
    	var square = gameView.getSquare(e.clientX, e.clientY);
    	gameController.claimSquare(square);
    });

    $('#twoPlayer').click(function() { gameController.startTwoPlayerGame() });
    $('#onePlayer').click(function() { gameController.startOnePlayerGame() });
  });

})(jQuery, t3View, t3Controller, joshua);
