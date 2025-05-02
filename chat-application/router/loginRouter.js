const express = require('express');
const { getLogin } = require('../controller/loginController');
const decorateHtmlResponse  = require('../midlewares/common/decorateHtmlResponse');
const router = express.Router();



// get login
router.get('/', decorateHtmlResponse("Login"),  getLogin);

module.exports = router;