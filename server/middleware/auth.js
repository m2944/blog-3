const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // 1. Get the token from the 'Authorization' header
    // The header looks like: "Bearer YOUR_TOKEN_STRING"
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // 2. Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Add the user's ID from the token payload to the request object
    req.user = decodedToken.id; // Now our protected routes will know who the user is

    // 4. Call 'next()' to proceed to the actual route logic
    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};

module.exports = auth;