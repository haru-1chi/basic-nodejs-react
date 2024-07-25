const express = require("express");
const {
  Register,
  verifyEmail,
  Login,
  Logout,
  forgetPassword,
  verifyPasswordReset,
  resetPassword
} = require("../controllers/authController");
const { validateRegister, validateLogin, validateEmail, Validate } = require("../middleware/validate");
const router = express.Router();

router.post("/register", validateRegister, Validate, Register);

router.post("/login", validateLogin, Validate, Login);

router.get("/logout", Logout);

router.get("/users/:id/verify/:token/", verifyEmail);

router.post("/forgetpassword", validateEmail, Validate, forgetPassword);

router.get("/users/:id/reset-password/:token/", verifyPasswordReset);

router.post('/users/:token/reset-password',Validate, resetPassword);

module.exports = router;
