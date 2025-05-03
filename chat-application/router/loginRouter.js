const express = require('express');
const { getLogin, login, logout } = require('../controller/loginController');
const decorateHtmlResponse  = require('../midlewares/common/decorateHtmlResponse');
const { doLoginValidators, doLoginValidationHandler } = require('../midlewares/login/loginValidators');
const { redirectLoggedIn } = require('../midlewares/common/checkLogin');


const router = express.Router();

// set page title
const page_title = "Login";

// get login
router.get('/', decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// login // here need decorateHtmlResponse(because this is html reponse not json respons)
router.post('/', decorateHtmlResponse(page_title), doLoginValidators, doLoginValidationHandler, login);

// logout
router.delete('/', logout);

module.exports = router;