const express = require("express");
const { Register } = require("../controllers/authController");
const { Login } = require("../controllers/authController");
const { Logout } = require("../controllers/authController");
const Validate = require("../middleware/validate");
const { check } = require("express-validator");
const router = express.Router();

// Register route -- POST request
router.post(
  "/register",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Your username is required")
      .trim()
      .escape(),
    check("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    check("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),
  ],
  Validate,
  Register
);

router.post(
  "/login",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password").not().isEmpty(),
  Validate,
  Login
);

router.get("/logout", Logout);

module.exports = router;
