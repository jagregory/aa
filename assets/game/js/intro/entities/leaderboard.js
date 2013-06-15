var Entity = require('../../engine/entity')
var GF  = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

function Leaderboard(id) {
  
  this.id = id;
  this.players = []
  
  $.ajax({
    url: '/player',
    async: false,
    success: function(data) {
      this.players = data.sort(function(x,y) {
        return y.topScore - x.topScore
      }).slice(0, 10)
    }.bind(this)
  })

  this.sprites = [
    GF.uiSprite('/game/images/leaderboard.png', userInterface.width, userInterface.height)
  ];

  var y = 0

  var titleSprite = GF.text('LEADERBOARD', 65, {
    strokeThickness: 4
  })
  titleSprite.position.x = userInterface.width / 2 - titleSprite.width  / 2;
  titleSprite.position.y = (y += 50);

  y += titleSprite.height

  this.sprites.push(titleSprite)

  this.players.forEach(function(player) {
    var textSprite = GF.text(player.firstName + ' ... ' + player.topScore, 30, {
      strokeThickness: 4
    })
    textSprite.position.x = userInterface.width / 2 - titleSprite.width  / 2;
    textSprite.position.y = (y += 10)
    y += textSprite.height
    this.sprites.push(textSprite)
  }.bind(this))
}

Leaderboard.prototype = new Entity();

Leaderboard.prototype.create = function(engine, game) {
  this.sprites.forEach(function(sprite) {
    engine.graphics.add(sprite)
  })
};

Leaderboard.prototype.destroy = function(engine, game) {
  this.sprites.forEach(function(sprite) {
    engine.graphics.remove(sprite)
  })
};

Leaderboard.prototype.update = function() {}

module.exports = Leaderboard