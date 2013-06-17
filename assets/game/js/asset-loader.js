var assets = require('./assets');

function loadImages(callback) {
  var assetLoader = new PIXI.AssetLoader(assets.allImages());
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
