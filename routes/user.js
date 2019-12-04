const express = require('express');
const router = express.Router();
const userController = require("../controllers/user-controller");

// Matches with "/login"
router.route("/login")
  .post(userController.login)

  // Matches with "/signup"
router.route("/signup")
  .post(userController.signup)

module.exports = router;