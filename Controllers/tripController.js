// controllers/tripController.js
const Trip = require('../Models/trip');

// Add New Trip
const addTrip = async (req, res) => {
    const { destination, price } = req.body;

    if (!destination || !price) {
        return res.status(400).json({ error: 'Destination and price are required!' });
    }

    try {
        const trip = new Trip({ destination, price });
        await trip.save();
        res.status(201).json({ message: 'Trip added successfully!', trip });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add trip!' });
    }
};

// Get All Trips
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch trips!' });
    }
};

module.exports = { addTrip, getTrips };
