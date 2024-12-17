const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' }, // Profile picture URL
    bio: { type: String, default: '' },           // Short bio
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of follower IDs
    achievements: [{ type: String }],            // List of achievement strings
}, { timestamps: true }); // Automatically add createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
