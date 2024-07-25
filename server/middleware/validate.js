const { check, validationResult } = require('express-validator');

const Validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
};

const validateRegister = [
    check("username").not().isEmpty().withMessage("Your username is required").trim().escape(),
    check("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
    check("password").notEmpty().isLength({ min: 8 }).withMessage("Must be at least 8 chars long"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() });
      }
      next();
    }
  ];
  
  const validateLogin = [
    check("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
    check("password").not().isEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() });
      }
      next();
    }
  ];
  
  const validateEmail = [
    check("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: "error", errors: errors.array() });
      }
      next();
    }
  ];

module.exports = { validateRegister, validateLogin, validateEmail, Validate };