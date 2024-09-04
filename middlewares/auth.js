const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(403).json({ message: 'User Unauthorized! Please Open an Account!' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // Attach user object with userId to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  verifyToken,
};
