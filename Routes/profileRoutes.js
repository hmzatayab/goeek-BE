const express = require('express');
const router = express.Router();
const { updateProfile, toggleFollow, addAchievement } = require('../Controllers/profileController');
const authenticate = require('../Minddleware/authMiddleware');

// Update profile
router.put('/', authenticate, updateProfile);

// Follow or unfollow user
router.post('/follow', authenticate, toggleFollow);

// Add achievement
router.post('/achievement', authenticate, addAchievement);

module.exports = router;
