const User = require('../Models/user');

// Update Profile
const updateProfile = async (req, res) => {
    const { name, bio, profilePicture } = req.body;
    const userId = req.user; // Authenticated user ID

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, bio, profilePicture },
            { new: true } // Return updated document
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

// Follow or Unfollow User
const toggleFollow = async (req, res) => {
    const userId = req.user; // Authenticated user ID
    const { followId } = req.body; // ID of the user to follow/unfollow

    try {
        const user = await User.findById(userId);

        if (user.followers.includes(followId)) {
            // Unfollow logic
            user.followers = user.followers.filter(follower => follower.toString() !== followId);
            message = 'User unfollowed successfully!';
        } else {
            // Follow logic
            user.followers.push(followId);
            message = 'User followed successfully!';
        }

        await user.save();

        res.status(200).json({
            success: true,
            message,
        });
    } catch (error) {
        console.error('Error toggling follow:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

// Add Achievement
const addAchievement = async (req, res) => {
    const userId = req.user; // Authenticated user ID
    const { achievement } = req.body;

    try {
        const user = await User.findById(userId);
        user.achievements.push(achievement);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Achievement added successfully!',
            achievements: user.achievements
        });
    } catch (error) {
        console.error('Error adding achievement:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

module.exports = {
    updateProfile,
    toggleFollow,
    addAchievement
};
