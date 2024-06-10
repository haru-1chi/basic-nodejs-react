const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { Verify } = require('../middleware/verify');

const router = express.Router();

router.get('/profile', Verify, getProfile);
router.post('/updateprofile', Verify, updateProfile);

module.exports = router;
