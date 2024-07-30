const express = require("express");
const {
  signup_Controller,
  login_Controller,
  check_auth_controller,
} = require("../controllers/auth_Controller");
const check_auth_middleware = require("../middleware/check_auth_middleware");

const router = express.Router();

router.post("/signup", signup_Controller);

router.post("/login", login_Controller);

router.get("/check-auth", check_auth_middleware, check_auth_controller);

module.exports = router;
