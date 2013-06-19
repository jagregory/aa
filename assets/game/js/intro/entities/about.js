var Entity        = require('../../engine/entity')
var GF            = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');
var assets        = require('../../assets');

var RED  = '#bf0000';
var BLUE = '#01518d';

function About(id) {
  
  this.id = id;

  console.log(userInterface.unit(1));
  this.sprites = [
    GF.uiSprite(assets.image('intro-about'), userInterface.width, userInterface.height),
    text('Built in 4 weeks  (after hours)', BLUE, 7, 13.5),
    text('Javascript', RED, 7, 26.5),
    text('WebGL', BLUE, 33, 26.5),
    text('Node.js', RED, 49, 26.5),
    text('Web sockets', BLUE, 68, 26.5),
    text('Ask us about', BLUE, 7, 39.5),
    text('web', RED, 34, 39.5),
    text('&', BLUE, 44, 39.5),
    text('mobile', RED, 49, 39.5),
    text('!', BLUE, 64, 39.5)
  ];

};

About.prototype = new Entity();

About.prototype.create = function(engine, game) {
  this.sprites.forEach(function(sprite) {
    engine.graphics.add(sprite);
  })
};

About.prototype.destroy = function(engine, game) {
  this.sprites.forEach(function(sprite) {
    engine.graphics.remove(sprite);
  })
};

function text(str, color, x, y) {
  var sprite = GF.text(str, userInterface.unit(3.8), {
    fill: color,
    strokeThickness: userInterface.unit(0.4)
  });
  sprite.position.x = userInterface.unit(x);
  sprite.position.y = userInterface.unit(y);
  return sprite;
}

module.exports = About;
