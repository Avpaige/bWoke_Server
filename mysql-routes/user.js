const express = require('express');
const router = express.Router();
const userController = require("../controllers/user-controller");

// Matches with "/user/match"
router.route("/login")
  .post(userController.login)

router.route("/signup")
  .post(userController.signup)

module.exports = router;