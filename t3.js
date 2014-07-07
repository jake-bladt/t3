(function($, gameView, gameController, ai) {

  // TODO - Separate out game data from controller.
  ai.gameData = gameController;
  gameController.ai = ai;
  gameView.controller = gameController;

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

})(jQuery, t3View, t3Controller, joshua);
