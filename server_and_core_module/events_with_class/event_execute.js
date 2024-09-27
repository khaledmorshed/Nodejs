const School = require('./school');

const school = new School();

// register a listener for bellRing event
school.on('bellRing', ({ first, second }) => {
    console.log(`We need to go outside because ${first} ${second}`);
});

school.startPeriod();
