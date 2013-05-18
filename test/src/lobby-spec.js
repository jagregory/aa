var lobby = require(SRC + '/lobby.js');

function players() {
  return lobby.state().players;
}

describe('Lobby', function() {
  
  beforeEach(function() {
    lobby.clear();
  });

  it('starts with empty slots', function() {
    players().should.eql([
      {id: null},
      {id: null}
    ]);
  });
  
  it('can add players', function() {
    lobby.addPlayer({id: '1'});
    players().should.eql([
      {id: '1'},
      {id: null}
    ]);
    lobby.addPlayer({id: '2'});
    players().should.eql([
      {id: '1'},
      {id: '2'}
    ]);
  });
  
});
