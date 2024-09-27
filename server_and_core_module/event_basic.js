const EventEmitter = require('events');

const emitter = new EventEmitter();

/// /1
// // register a lisnter for bellRing event(listen)
// emitter.on('bellRing', () => {
//     console.log('Student will go outside');
// });

// // raise an emitter(initialize an imitter)
// emitter.emit('bellRing');

// setTimeout(() => {
//     emitter.emit('bellRing');
// }, 2000);

// /// 2
// // register a lisnter for bellRing event(listen)
// emitter.on('bellRing', (period) => {
//     console.log(`Student will go outside because ${period}`);
// });

// // raise an emitter(initialize an imitter)
// emitter.emit('bellRing', 'second period ended');

/// 3
// register a lisnter for bellRing event(listen)
emitter.on('bellRing', ({ period, txt }) => {
    console.log(`Student will go outside because ${period} ${txt}`);
});

// raise an emitter(initialize an imitter)
emitter.emit('bellRing', { period: 'second', txt: 'period ended' });
