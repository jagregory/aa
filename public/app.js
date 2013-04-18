;(function() {
  var Game = function(callbacks) {
    var socket = io.connect('http://localhost:8080')

    socket.on('user-count', function(data) {
      callbacks.userCount(data.count)
    })

    socket.on('start-game', function(data) {
      callbacks.message('Starting game')
      callbacks.names(data.player1.username, data.player2.username)
      callbacks.scores(data.player1.score, data.player2.score)
      callbacks.positions(data.player1.position, data.player2.position, data.ball.position)
    })

    socket.on('tick', function(data) {
      callbacks.message('Playing')
      callbacks.scores(data.player1.score, data.player2.score)
      callbacks.positions(data.player1.position, data.player2.position, data.ball.position)
    })

    socket.on('message', callbacks.message)

    return {
      join: function(username) {
        socket.emit('join', { username: username })
      },
      move: function(delta) {
        socket.emit('move', { delta: delta })
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
      },
      positions: function(p1pos, p2pos, ballpos) {
        var p1paddle = board.find('.paddle.p1')
        var p2paddle = board.find('.paddle.p2')
        var ball = board.find('.ball')
        
        p1paddle.css('top', (p1pos * board.height()) - (p1paddle.height() / 2))
        p2paddle.css('top', (p2pos * board.height()) - (p2paddle.height() / 2))
        ball.css({
          top: ((ballpos.y * board.height()) - (ball.height() / 2)),
          left: ((ballpos.x * (board.width() / 2)) - (ball.width() / 2))
        })
      }
    })
    
    $('#register').click(function() {
      var username = $('#username').val().trim()

      if (username.length === 0) {
        alert('Please enter your username')
      } else {
        game.join(username)
      }
    })

    $('body').on('keydown', function(e) {
      if (e.keyIdentifier === 'Up') {
        game.move(-0.05)
        return false
      } else if (e.keyIdentifier === 'Down') {
        game.move(0.05)
        return false
      }
      return true
    })
  })
})()