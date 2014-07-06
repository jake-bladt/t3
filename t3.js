t3 = function() {};
t3.gameView = function() {};
t3.gameController = function() {};

(function($, gameView, gameController) {
  $(document).ready(function() {
    alert("jQuery is loaded.");	
  });

})(jQuery, t3.gameView, t3.gameController);
