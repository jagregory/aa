
exports.connect = function(matchStart, playerMove) {

  var keydown       = $(document).keydownAsObservable().select(keyCode);
  var keyup         = $(document).keyupAsObservable();
  var singledown    = keydown.merge(keyup).distinctUntilChanged();
  
  singledown.where(key(13)).subscribe(start);
  singledown.where(letter('Q')).subscribe(move(0, 'up'));
  singledown.where(letter('S')).subscribe(move(0, 'down'));
  singledown.where(letter('P')).subscribe(move(1, 'up'));
  singledown.where(letter('L')).subscribe(move(1, 'down'));

  function keyCode(e) {
    return e.keyCode;
  }

  function key(c) {
    return function(code) {
      return code === c;
    };
  }
  
  function letter(l) {
    return function(code) {
      return code === l.charCodeAt(0);
    };
  }
  
  function start() {
    matchStart([
      { id: '1', firstName: 'John', lastName: 'Doe'   },
      { id: '2', firstName: 'Bill', lastName: 'Cosby' }
    ]);
  }
  
  function move(index, dir) {
    return function() { 
      console.log('[keyboard] move ' + index + ' ' + dir);
      playerMove({
        pindex: index,
        dir: dir
      });
    };
  }
  
};
