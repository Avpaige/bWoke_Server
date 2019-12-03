const path = require("path");
const router = require("express").Router();
const chatRoutes = require("./chat.js");
const eventRoutes = require("./events.js");
const celebEvents = require("./celebrities.js");



router.use("/chat", chatRoutes);
router.use("/events", eventRoutes);
router.use("/celebrity", celebEvents);


module.exports = router;