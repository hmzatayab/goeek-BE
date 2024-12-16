const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],   // Array of image URLs
    itinerary: [{ day: Number, detail: String }], // Itinerary as an array
    detail: { type: String },
    duration: { type: String },
    distance: { type: String },
    weather: { type: String },
    categories: [{ type: String }]
});

module.exports = mongoose.model('Trip', tripSchema);
