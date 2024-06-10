const express = require('express');
const router = express.Router();
const { getListUser, deleteUser } = require('../controllers/adminController');
const { Verify, VerifyRole } = require('../middleware/verify');

// Middleware to ensure the user is authenticated and has admin privileges
router.use(Verify);
router.use(VerifyRole); // Assuming VerifyRole middleware checks for admin role

router.get('/users', getListUser);
router.delete('/user/:userId', deleteUser);

module.exports = router;
