var GameEngine      = require('./game-engine');
var bridgeSocket    = require('./bridge/socket');
var bridgeKeyboard  = require('./bridge/keyboard');
var scoreView       = require('../views/scores.hbs');
var hub             = require('./hub');

window.Main = function() {
  
  var gameEngine  = null;

  $(window).resize(resize);

  var board           = document.querySelector('#game');
  var debugCanvas     = document.querySelector('#debugDraw');
  // var scoreContainer  = document.querySelector('#scores');
  
  // scoreContainer.innerHTML = scoreView({
  //   p1: { name: '-', score: 0 },
  //   p2: { name: '-', score: 0 }
  // });
  
  // Wire external events
  bridgeKeyboard.connect(matchStart, playerMove, playerStop);
  bridgeSocket.connect(matchStart, playerMove, playerStop);
  
  function matchStart(players) {
    // Cleanup any previous game?
    var players = players.map(function(p) {
      return {
        id: p.id,
        name: p.firstName + ' ' + p.lastName,
        score: 0
      }
    });
    gameEngine = new GameEngine({
      players: players,
      debugDraw: debugCanvas
    });
    board.appendChild(gameEngine.view);
    resize();
    updateScore();
  }

  function playerMove(args) {
    if (gameEngine) {
      gameEngine.input('move', args);
    }
  }
  
  function playerStop(args) {
    if (gameEngine) {
      gameEngine.input('stop', args);
    }
  }
  
  function updateScore() {
    // scoreContainer.innerHTML = scoreView({
    //   p1: gameEngine.players[0],
    //   p2: gameEngine.players[1]
    // });
  }
  
  hub.on('score', function() {
    // We don't control the order of event handlers
    // Ideally, this will just react to the "players" model changing
    // With some sort of MVVM framework
    setTimeout(updateScore, 100);
  });
  
  function resize() {
  	var width  = $(window).width(); 
  	var height = $(window).height(); 	
  	if (gameEngine) {
  		gameEngine.resize(width, height);
  	}
  }  
  
};





//
//
// Old code, where do we put this?
//
//

/*
  var assetLoader = new PIXI.AssetLoader(['/game/images/paddle.png', '/game/images/ball.png', '/game/images/particle.png']);
  assetLoader.onComplete = function() {
    console.log('Assets loaded. Starting game.')
    bridgeSocket.connect(matchStart, matchMove);
    bridgeKeyboard.connect(matchStart, matchMove);
  };

  console.log('Loading assets');
  assetLoader.load();
*/

