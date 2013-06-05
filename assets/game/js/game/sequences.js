
exports.states = {
  'warmup':     require('./states/warmup'),
  'kickoff':    require('./states/kickoff'),
  'play':       require('./states/play'),
  'scored':     require('./states/scored'),
  'endofmatch': require('./states/endofmatch')
};

exports.transitions = [
    {   name: 'startup',  from: 'none',                                   to: 'warmup'       },
    {   name: 'ready',    from: ['warmup', 'scored'],                     to: 'kickoff'      },
    {   name: 'go',       from: 'kickoff',                                to: 'play'         },
    {   name: 'scored',   from: 'play',                                   to: 'scored'       },
    {   name: 'end',      from: ['warmup', 'kickoff', 'play', 'scored'],  to: 'endofmatch'   },
];
