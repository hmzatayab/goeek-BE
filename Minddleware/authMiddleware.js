const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret'); // Use environment variable
        req.user = decoded.userId;
        next();
    } catch (err) {
        console.error('JWT Authentication Error:', err.message);
        res.status(401).json({ error: 'Token is not valid!' });
    }
};

module.exports = authenticate;
