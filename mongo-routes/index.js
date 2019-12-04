const path = require("path");
const router = require("express").Router();
const chatRoutes = require("./chat.js");
const eventRoutes = require("./events.js");
const searchEvents = require("./search.js");


router.use("/chat", chatRoutes);
router.use("/events", eventRoutes);
router.use("/search", searchEvents);


module.exports = router;