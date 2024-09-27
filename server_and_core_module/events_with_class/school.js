const EventEmitter = require('events');

class School extends EventEmitter {
    startPeriod() {
        console.log('class started');

        this.emit('bellRing', {
            first: 'second',
            second: 'period ended.',
        });
    }
}

module.exports = School;
