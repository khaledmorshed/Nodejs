const express = require("express");
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../midlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../midlewares/common/checkLogin");

const router = express.Router();

// get inbox
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
