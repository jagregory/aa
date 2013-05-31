
exports.connect = function(matchStart, playerMove, playerStop) {

  var keydown       = $(document).keydownAsObservable().select(keyCode);
  var keyup         = $(document).keyupAsObservable();
  var singledown    = keydown.merge(keyup).distinctUntilChanged();
  
  singledown.where(key(13)).take(1).subscribe(start);
  
  singledown.where(letter('Q')).subscribe(move(0, 'up'));
  singledown.where(letter('S')).subscribe(move(0, 'down'));
  singledown.where(letter('P')).subscribe(move(1, 'up'));
  singledown.where(letter('L')).subscribe(move(1, 'down'));

  keyup.select(keyCode).where(letter('Q')).subscribe(stop(0));
  keyup.select(keyCode).where(letter('S')).subscribe(stop(0));
  keyup.select(keyCode).where(letter('P')).subscribe(stop(1));
  keyup.select(keyCode).where(letter('L')).subscribe(stop(1));

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
      {id: '1', name: 'John'},
      {id: '2', name: 'Bill'}
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
  
  function stop(index) {
    return function(e) {
      console.log('[keyboard] stop ' + index);
      playerStop({
        pindex: index,
      });
    };
  }
  
};
