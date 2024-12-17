const express = require('express');
const router = express.Router();
const {
    updateProfile,
    toggleFollow,
    addAchievement,
    addFollower,
    removeFollower,
    getFollowers
} = require('../Controllers/profileController');
const authenticate = require('../Minddleware/authMiddleware');

// Update profile
router.put('/', authenticate, updateProfile);

// Follow or unfollow user
router.post('/follow', authenticate, toggleFollow);

// Add achievement
router.post('/achievement', authenticate, addAchievement);

// Add follower
router.post('/follow/:id', authenticate, addFollower);

// Remove follower
router.delete('/unfollow/:id', authenticate, removeFollower);

// Get followers list
router.get('/followers', authenticate, getFollowers);

module.exports = router;
