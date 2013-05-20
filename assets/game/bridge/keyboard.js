
exports.connect = function(matchStart, matchMove) {

  var keydown = $(document).keydownAsObservable();
  var keyup = $(document).keyupAsObservable();
  
  keydown.where(key(13)).take(1).subscribe(start);
  keydown.where(letter('Q')).throttle(10).subscribe(move(0, 'up'));
  keydown.where(letter('S')).throttle(10).subscribe(move(0, 'down'));
  keydown.where(letter('P')).throttle(10).subscribe(move(1, 'up'));
  keydown.where(letter('L')).throttle(10).subscribe(move(1, 'down'));

  keyup.where(letter('Q')).subscribe(stop(0));
  keyup.where(letter('S')).subscribe(stop(0));
  keyup.where(letter('P')).subscribe(stop(1));
  keyup.where(letter('L')).subscribe(stop(1));

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
          y: (dir === 'up') ? 25 : -25
        }
      });
    };
  }
  
  function stop(index) {
    return function(e) {
      matchMove({
        pindex: index,
        vector: {
          x: 0,
          y: 0
        }
      });
    };
  }
  
};
