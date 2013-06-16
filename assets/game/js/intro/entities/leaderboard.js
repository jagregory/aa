var Entity = require('../../engine/entity')
var GF  = require('../../engine/graphics-factory');
var userInterface = require('../../engine/user-interface');

var formatAsRank = function(num) {
  if (num === 1) {
    return num + 'st'
  } else if (num === 2) {
    return num + 'nd'
  } else if (num === 3) {
    return num + 'rd'
  } else {
    return num + 'th'
  }
}

var unit = function(n) {
  return (userInterface.width / 100) * n
}

function Leaderboard(id) {
  var DefaultTextOptions = {
    strokeThickness: unit(0.7),
    fill: '#01518d'
  }
  var DefaultFontSize = unit(5)

  this.id = id;
  this.players = []
  
  $.ajax({
    url: '/player',
    async: false,
    success: function(data) {
      this.players = data.sort(function(x,y) {
        return y.topScore - x.topScore
      }).slice(0, 5)
    }.bind(this)
  })

  this.sprites = [
    GF.uiSprite('/game/images/leaderboard.png', userInterface.width, userInterface.height)
  ];

  var currentY = unit(21)
  var i = 1

  this.players.forEach(function(player) {
    var rankSprite = GF.text(formatAsRank(i), DefaultFontSize, DefaultTextOptions)
    rankSprite.position.y = currentY
    rankSprite.position.x = unit(5)
    this.sprites.push(rankSprite)

    var playerNameSprite = GF.text((player.firstName + ' ' + player.lastName.substring(0, 1)).toUpperCase(), DefaultFontSize, $.extend({}, DefaultTextOptions, { fill: '#bf0000' }))
    playerNameSprite.position.x = unit(18)
    playerNameSprite.position.y = currentY
    this.sprites.push(playerNameSprite)

    var companySprite = GF.text((player.company || '?').toUpperCase(), unit(3), $.extend({}, DefaultTextOptions, { strokeThickness: unit(0.5) }))
    companySprite.position.x = playerNameSprite.position.x + playerNameSprite.width + unit(2)
    companySprite.position.y = currentY + unit(1.5)
    this.sprites.push(companySprite)

    var scoreSprite = GF.text(player.topScore + ' GOALS', DefaultFontSize, DefaultTextOptions)
    scoreSprite.position.x = userInterface.width - scoreSprite.width - unit(5)
    scoreSprite.position.y = currentY
    this.sprites.push(scoreSprite)
    
    currentY += playerNameSprite.height + unit(0.6)
    i += 1
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