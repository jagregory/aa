;(function() {
  var Game = function(callbacks) {
    var socket = io.connect('http://localhost:8080')

    socket.on('user-count', function(data) {
      callbacks.userCount(data.count)
    })

    socket.on('start-game', function(data) {
      callbacks.message('Starting game')
      callbacks.scores(data.player1.score, data.player2.score)
      callbacks.positions(data.player1.position, data.player2.position)
    })

    socket.on('message', callbacks.message)

    return {
      join: function(username) {
        socket.emit('join', { username: username })
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
      positions: function(p1pos, p2pos) {
        var p1paddle = board.find('.paddle.p1')
        var p2paddle = board.find('.paddle.p2')
        
        p1paddle.css('top', (p1pos * board.height()) - (p1paddle.height() / 2))
        p2paddle.css('top', (p2pos * board.height()) - (p2paddle.height() / 2))
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
  })
})()