const jwt = require("jsonwebtoken");
const config = require("../config");

// Middleware to authenticate user
exports.authenticateUser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Access denied, missing token" });
    }

    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, config.jwtSecret);

        // Attach the user ID to the request object
        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// Middleware to authorize user based on user type
exports.authorizeUser = (userType) => (req, res, next) => {
    // Check if the user type matches the required type
    if (req.userType === userType) {
        next();
    } else {
        return res.status(403).json({ error: "Access denied" });
    }
};
