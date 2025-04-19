// dependencies
const { sampleHandler } = require('../handlers/sample_handler');
const { userHandler } = require('../handlers/user_handler');
const { tokenHandler } = require('../handlers/token_handler');
const { checkHandler } = require('../handlers/check_handler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
    check: checkHandler,
};

module.exports = routes;
