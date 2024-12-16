// controllers/tripController.js
const Trip = require('../Models/trip');

// Add New Trip
const addTrip = async (req, res) => {
    const {
        title,
        overview,
        destination,
        price,
        images,
        itinerary,
        detail,
        duration,
        distance,
        weather,
        categories
    } = req.body;

    // Validate required fields
    if (!destination || !price || !title) {
        return res.status(400).json({ error: 'Title, destination, and price are required!' });
    }

    try {
        // Create a new trip instance with all fields
        const trip = new Trip({
            title,
            overview,
            destination,
            price,
            images,
            itinerary,
            detail,
            duration,
            distance,
            weather,
            categories
        });
        await trip.save();
        res.status(201).json({ message: 'Trip added successfully!', trip });
    } catch (err) {
        console.error(err); // Log error for debugging
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


// Search Listings funcation
const searchListings = async (req, res) => {
    try {
        // Extract filters from query parameters
        const { from, to, keyword } = req.query;

        // Mock listings data (Ye replace hoga database se data fetch karke)
        const listings = [
            { id: 1, from: 'Lahore', to: 'Karachi', title: 'Trip to Karachi', description: 'Enjoy the sea view' },
            { id: 2, from: 'Islamabad', to: 'Swat', title: 'Trip to Swat', description: 'Discover the mountains' },
            { id: 3, from: 'Lahore', to: 'Dubai', title: 'Trip to Dubai', description: 'Luxury city adventure' },
        ];

        // Filter data based on query parameters
        let filteredListings = listings;

        if (from) {
            filteredListings = filteredListings.filter(listing => listing.from.toLowerCase() === from.toLowerCase());
        }

        if (to) {
            filteredListings = filteredListings.filter(listing => listing.to.toLowerCase() === to.toLowerCase());
        }

        if (keyword) {
            filteredListings = filteredListings.filter(listing =>
                listing.title.toLowerCase().includes(keyword.toLowerCase()) ||
                listing.description.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        // Return filtered data
        res.status(200).json({
            success: true,
            data: filteredListings,
            message: 'Listings fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching listings:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error. Could not fetch listings.',
        });
    }
};


module.exports = { addTrip, getTrips };
module.exports = {
    searchListings
};
