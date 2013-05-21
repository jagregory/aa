
var fsm = StateMachine.create({
  
  initial: 'pre-match',
  
  events: [
    {   name: 'join',       from: 'pre-match',             to: 'warm-up'        },
    {   name: 'ready',      from: 'warm-up',               to: 'kick-off'       },
    {   name: 'countdown',  from: ['scored', 'kick-off'],  to: 'play'           },
    {   name: 'score',      from: 'play',                  to: 'scored'         },
    {   name: 'end',        from: 'scored',                to: 'end-of-match'   },
  ]
  
});
