// dependencies
const { sampleHandler } = require('../handlers/sample_handler');
const { userHandler } = require('../handlers/user_handler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
