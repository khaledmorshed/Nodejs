const express = require('express');
const { getUsers, addUser, removeUser } = require('../controller/usersController');
const decorateHtmlResponse  = require('../midlewares/common/decorateHtmlResponse');
const avatarUpload = require('../midlewares/users/avaterUpload');
const { check } = require('express-validator');
const { addUserValidators, addUserValidationHandler } = require('../midlewares/users/usersValidator');
const router = express.Router();



// get users
router.get('/', decorateHtmlResponse("Users"), getUsers);

// add users
router.post('/', avatarUpload, addUserValidators, addUserValidationHandler, addUser);


// delete user
router.delete('/:id', removeUser);

module.exports = router;