const express = require('express');
const router = express.Router();
const eventsController = require("../controllers/events-controller");

// Matches with "/events"
router.route("/")
  .post(eventsController.postEvent)
  .get(eventsController.getEvents)

module.exports = router;