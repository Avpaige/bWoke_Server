const express = require('express');
const router = express.Router();
const celebController = require("../controllers/celeb-conttroller");

// Matches with "/volunteer/:mysqlID" (in login)
router
    .route("/:search")
    .get(celebController.getSearch) // FE: login

module.exports = router;