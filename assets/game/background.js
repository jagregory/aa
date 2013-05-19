module.exports = function(game) {
  this.update = function(delta) {
    game.stage.setBackgroundColor(Math.random()*16777215)
  }
}