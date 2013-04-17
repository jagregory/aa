;(function() {
  var Game = function(userCountCallback) {
    var socket = io.connect('http://localhost:8080')

    socket.on('user-count', function(data) {
      userCountCallback(data.count)
    })

    return {
      join: function(username) {
        socket.emit('join', { username: username })
      }
    }
  }

  var countElement = document.getElementById('count')
  
  var game = new Game(function(count) {
    countElement.innerText = count
  })
  
  document.getElementById('register')
    .addEventListener('click', function() {
      var username = document.getElementById('username').value.trim()

      if (username.length === 0) {
        alert('Please enter your username')
      } else {
        game.join(username)
      }
    })
})()