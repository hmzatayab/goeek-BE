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

// Add Follower (Specific Logic)
const addFollower = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (currentUser.followers.includes(userToFollow._id)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        currentUser.followers.push(userToFollow._id);
        await currentUser.save();

        res.status(200).json({ success: true, message: 'User followed successfully!' });
    } catch (error) {
        console.error('Error adding follower:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

// Remove Follower
const removeFollower = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        currentUser.followers = currentUser.followers.filter(
            (id) => id.toString() !== userToUnfollow._id.toString()
        );
        await currentUser.save();

        res.status(200).json({ success: true, message: 'User unfollowed successfully!' });
    } catch (error) {
        console.error('Error removing follower:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

// Get Followers List
const getFollowers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user).populate('followers', 'name email');

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            followers: currentUser.followers,
        });
    } catch (error) {
        console.error('Error fetching followers:', error.message);
        res.status(500).json({ success: false, message: 'Server error!' });
    }
};

module.exports = {
    updateProfile,
    toggleFollow,
    addAchievement,
    addFollower,
    removeFollower,
    getFollowers
};
