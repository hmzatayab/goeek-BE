// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { addTrip, getTrips, createTrip } = require('../Controllers/tripController');
const authenticate = require('../Minddleware/authMiddleware');

// Public route for getting trips
router.get('/trips', getTrips);

// Protected route for adding trips
router.post('/trips', authenticate, addTrip);

router.post('/api/trips', authenticate, createTrip);

module.exports = router;
