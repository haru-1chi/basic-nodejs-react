const express = require("express");
const router = express.Router();
const { getListUser, deleteUser } = require("../controllers/adminController");
const { Verify, VerifyRole } = require("../middleware/verify");

router.use(Verify);
router.use(VerifyRole);

router.get("/users", getListUser);
router.delete("/user/:userId", deleteUser);

module.exports = router;