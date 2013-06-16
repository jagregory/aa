
var assets = [
  '/game/images/ball.png',
  '/game/images/boom-circle.png',
  '/game/images/boom-line.png',
  '/game/images/boom-splash.png',
  '/game/images/cat-down.png',
  '/game/images/cat-up.png',
  '/game/images/cat.png',
  '/game/images/cone.png',
  '/game/images/dog-down.png',
  '/game/images/dog-up.png',
  '/game/images/dog.png',
  '/game/images/leaderboard.png',
  '/game/images/particle-orange.png',
  '/game/images/particle.png',
  '/game/images/stadium-shake-left.png',
  '/game/images/stadium-shake-right.png',
  '/game/images/stadium.png',
  '/game/images/title.png'
];

function loadImages(callback) {
  var assetLoader = new PIXI.AssetLoader(assets);
  assetLoader.onComplete = callback;
  assetLoader.load();
}

function loadFonts(callback) {
  WebFont.load({
    active: callback,
    custom: {
      families: ['LuckiestGuy'],
      urls: ['/3rdparty/luckiest-guy.css'],
    }
  });
}

exports.preloadAndRun = function(callback) {
  loadImages(function() {
    loadFonts(function() {
      callback();
    });
  });
}
