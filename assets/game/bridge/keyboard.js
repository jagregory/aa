
exports.connect = function(matchStart, matchMove) {

  var keyup = $(document).keyupAsObservable();
  
  keyup.where(key(13)).take(1).subscribe(start);
  keyup.where(letter('Q')).throttle(50).subscribe(move(0, 'up'));
  keyup.where(letter('S')).throttle(50).subscribe(move(0, 'down'));
  keyup.where(letter('P')).throttle(50).subscribe(move(1, 'up'));
  keyup.where(letter('L')).throttle(50).subscribe(move(1, 'down'));

  function key(code) {
    return function(e) {
      return e.keyCode === code;
    };
  }
  
  function letter(l) {
    return function(e) {
      return e.keyCode === l.charCodeAt(0);
    };
  }
  
  function start() {
    matchStart([
      {id: '1', name: 'John'},
      {id: '2', name: 'Bill'}
    ]);
  }
  
  function move(index, dir) {
    return function() { 
      matchMove({
        pindex: index,
        vector: {
          x: 0,
          y: (dir === 'up') ? 20 : -20
        }
      });
    };
  }
  
};
