const path = require("path");
const router = require("express").Router();
const chatRoutes = require("./chat.js");
const eventRoutes = require("./events.js");



router.use("/chat", chatRoutes);
router.use("/events", eventRoutes);


module.exports = router;