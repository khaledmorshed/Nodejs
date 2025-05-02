const express = require('express');
const { getUsers } = require('../controller/usersController');
const decorateHtmlResponse  = require('../midlewares/common/decorateHtmlResponse');
const router = express.Router();



// get users
router.get('/', decorateHtmlResponse("Users"), getUsers);

module.exports = router;