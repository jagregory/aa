var lobby = require(SRC + '/lobby.js');

function players() {
  return lobby.state().players;
}

describe('Lobby', function() {
  
  beforeEach(function() {
    lobby.clear();
  });

  it("starts with empty slots", function() {
    players().should.eql([
      {id: null},
      {id: null}
    ]);
  });
  
  it("can add players", function() {
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

  it("can't add more than 2 players", function() {
    lobby.addPlayer({id: '1'});
    lobby.addPlayer({id: '2'});
    lobby.addPlayer({id: '3'});
    players().should.eql([
      {id: '1'},
      {id: '2'}
    ]);
  });

  it("can remove players", function() {
    lobby.addPlayer({id: '1'});
    lobby.addPlayer({id: '2'});
    lobby.removePlayer({id: '1'});
    players().should.eql([
      {id: null},
      {id: '2'}
    ]);
    lobby.removePlayer({id: '2'});
    players().should.eql([
      {id: null},
      {id: null}
    ]);
  });

  it("ignores removing players that aren't in the lobby", function() {
    lobby.addPlayer({id: '1'});
    lobby.addPlayer({id: '2'});
    lobby.removePlayer({id: '3'});
    players().should.eql([
      {id: '1'},
      {id: '2'}
    ]);
  });

  it("can tell if it's full", function() {
    lobby.isFull().should.eql(false);
    lobby.addPlayer({id: '1'});
    lobby.isFull().should.eql(false);
    lobby.addPlayer({id: '2'});
    lobby.isFull().should.eql(true);
  });

});
