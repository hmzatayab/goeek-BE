// index.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const tripRoutes = require('./Routes/tripRoutes');
const profileRoutes = require('./Routes/profileRoutes');




// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes);  // User routes
app.use('/api', tripRoutes);   // Trip routes
app.use('/api/profile', profileRoutes); // Profile routes

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

