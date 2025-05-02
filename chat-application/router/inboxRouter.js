const express = require('express');
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse  = require('../midlewares/common/decorateHtmlResponse');
const router = express.Router();



// get inbox
router.get('/', decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;