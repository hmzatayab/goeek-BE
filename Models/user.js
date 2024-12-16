// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },      // New field
    address: { type: String },    // New field
    age: { type: Number }         // New field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
