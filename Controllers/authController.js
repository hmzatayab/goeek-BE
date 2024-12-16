const User = require('../Models/user');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, email, password, phone, address, age } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,    // Add new fields here
            address,
            age
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser };
