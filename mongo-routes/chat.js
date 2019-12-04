const express = require('express');
const router = express.Router();
const chatController = require("../controllers/chat-controller");

// Matches with "/chat" ( post in form, put in account)
router.route("/")
    .post(chatController.postMessage)
// Matches with "/chat/:room" ( post in form, put in account)
router.route("/:room")
    .get(chatController.getMessages)

module.exports = router;