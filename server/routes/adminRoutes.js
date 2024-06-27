const express = require("express");
const router = express.Router();
const { getListUser, deleteUser } = require("../controllers/adminController");
const { Verify, VerifyRole } = require("../middleware/verify");

// Middleware to ensure the user is authenticated and has admin privileges
router.get("/users", Verify, VerifyRole, getListUser);
router.delete("/user/:userId", Verify, VerifyRole, deleteUser);

module.exports = router;
