// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})()

;(function() {
  var interval = 1000.0 / 60
  var Player = function(el, left) {
    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()
    var speed = 50.0
    var position = {
        x: left ? 0.025 : 1.925,
        y: 0.5
      },
      target = {
        x: 0,
        y: 0
      },

      animationStepX = 0,
      animationStepY = 0,
    
      update = function(delta) {
        if ((animationStepX > 0 && position.x < target.x) || (animationStepX < 0 && position.x > target.x)) {
          position.x += animationStepX * delta * speed
        }

        if ((animationStepY > 0 && position.y < target.y) || (animationStepY < 0 && position.y > target.y)) {
          position.y += animationStepY * delta * speed
        }
      },
    
      render = function() {
        el.css({
          top: position.y * boardHeight,
          left: position.x * (boardWidth / 2)
        })
      }

    return {
      moveTo: function(newPos) {
        target = newPos
        animationStepX = (newPos.x - position.x)
        animationStepY = (newPos.y - position.y)
      },
      tick: function(delta) {
        update(delta)
        render()
      }
    }
  }
  var Ball = function(el) {
    var boardHeight = $('#board').height()
    var boardWidth = $('#board').width()
    var speed = 50.0
    var position = {
        x: 1.0,
        y: 0.5
      },
      target = {
        x: 0,
        y: 0
      },

      animationStepX = 0,
      animationStepY = 0,
    
      update = function(delta) {
        if ((animationStepX > 0 && position.x < target.x) || (animationStepX < 0 && position.x > target.x)) {
          position.x += animationStepX * delta * speed
        }

        if ((animationStepY > 0 && position.y < target.y) || (animationStepY < 0 && position.y > target.y)) {
          position.y += animationStepY * delta * speed
        }
      },
    
      render = function() {
        el.css({
          top: position.y * boardHeight,
          left: position.x * (boardWidth / 2)
        })
      }

    return {
      moveTo: function(newPos) {
        target = newPos
        animationStepX = (newPos.x - position.x)
        animationStepY = (newPos.y - position.y)
      },
      tick: function(delta) {
        update(delta)
        render()
      }
    }
  }
  var Game = function(callbacks) {
    var socket = io.connect('http://localhost:8080')

    var ball = window.ball = new Ball($('.ball'))
    var player1 = window.p1 = new Player($('.paddle.p1'), true)
    var player2 = window.p2 = new Player($('.paddle.p2'), false)

    var lastLoopTime = +new Date()
    var tick = function() {
      var now = +new Date()
      var delta = (now - lastLoopTime) / 1000.0
      ball.tick(delta)
      player1.tick(delta)
      player2.tick(delta)
      lastLoopTime = now
    }

    socket.on('user-count', function(data) {
      callbacks.userCount(data.count)
    })

    socket.on('start-game', function(data) {
      callbacks.message('Starting game')
      player1.username = data.player1.username
      player2.username = data.player2.username
    })

    socket.on('tick', function(data) {
      ball.moveTo(data.ball.position, 100)
      player1.moveTo(data.player1.position, 100)
      player2.moveTo(data.player2.position, 100)
      callbacks.scores(data.player1.score, data.player2.score)
    })

    socket.on('message', callbacks.message)

    var g = this
    return {
      join: function(username) {
        socket.emit('join', { username: username })
      },
      move: function(position) {
        socket.emit('move', { position: position })
      },
      start: function() {
        setInterval(tick.bind(g), interval)
      }
    }
  }

  $(function() {
    var countElement = $('#count')
    var statusElement = $('#status')
    var board = $('#board')
    
    var game = new Game({
      userCount: function(count) {
        countElement.text(count)
      },
      message: function(message) {
        statusElement.text(message)
      },
      scores: function(p1score, p2score) {
        board.find('.scores .p1 span').text(p1score)
        board.find('.scores .p2 span').text(p2score)
      },
      names: function(p1name, p2name) {
        board.find('.scores .p1 .name').text(p1name)
        board.find('.scores .p2 .name').text(p2name)
      }
    })
    
    $('#register').click(function() {
      var username = $('#username').val().trim()

      if (username.length === 0) {
        alert('Please enter your username')
      } else {
        game.join(username)
        game.start()
      }
    })

    board.mousemove(function(e) {
      game.move((e.pageY - board.offset().top) / board.height())
    })
  })
})()