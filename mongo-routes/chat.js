const express = require('express');
const router = express.Router();
const chatController = require("../controllers/chat-controller");

// Matches with "/chat" ( post in form, put in account)
router.route("/")
    .get(chatController.getMessages) // FE: form
    .post(chatController.postMessages) // FE: account

module.exports = router;