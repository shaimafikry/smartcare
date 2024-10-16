// there is a problem in this page

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' });

const secret_key = process.env.SECRET_KEY;
// Middleware to verify JWT token and protect routes based on roles
const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header
    
    // Check if token exists
    if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Verify token
      jwt.verify(token, secret_key, (err, user)=> {
				if (err) {

					return res.status(403).send('Invalid Token');
				}

			console.log(user.role);
			// output doctor
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      // Attach user info to request object
		  req.user = user;

      // Continue to the next middleware/route handler
      next();
			}); // Use your JWT secret
      // Check if the user's role is allowed for this route


    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};

module.exports = verifyRole;
