const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, phone, address, age } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required!' });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with all fields
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,    // Include new fields
            address,  // Include new fields
            age       // Include new fields
        });

        await user.save();

        // Respond with the created user, but exclude password from response
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                age: user.age
            }
        });
    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).json({ error: 'Server error!' });
    }
};


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials!' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({
            message: 'Login successful!',
            token,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                age: user.age
            }  // Return the new fields in login response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error!' });
    }
};

module.exports = { registerUser, loginUser };
