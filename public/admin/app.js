$(function() {
  $('#register').click(function() {
    var username = $('#username').val().trim()

    if (username.length === 0) {
      alert('Please enter your username')
    } else {
      game.join(username)
    }
  })
})