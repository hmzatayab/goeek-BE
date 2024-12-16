// models/trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    price: { type: Number, required: true },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
