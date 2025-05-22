const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided or malformed token.' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
