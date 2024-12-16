// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied!' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid!' });
    }
};

module.exports = authenticate;
