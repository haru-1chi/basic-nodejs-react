const express = require('express');
const { Register } = require('../controllers/authController');
const { Login } = require('../controllers/authController');
const { Logout } = require('../controllers/authController');
const Validate = require('../middleware/validate');
const { check } = require('express-validator');
const router = express.Router();

// Register route -- POST request
router.post(
    "/register",
    [
        check("email")
            .isEmail()
            .withMessage("Enter a valid email address")
            .normalizeEmail(),
        check("first_name")
            .not()
            .isEmpty()
            .withMessage("Your first name is required")
            .trim()
            .escape(),
        check("last_name")
            .not()
            .isEmpty()
            .withMessage("Your last name is required")
            .trim()
            .escape(),
        check("password")
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage("Must be at least 8 chars long")
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

router.get('/logout', Logout);

module.exports = router;
