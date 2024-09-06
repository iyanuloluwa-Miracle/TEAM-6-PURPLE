const jwt = require('jsonwebtoken');
const fs = require('fs');
const blackList = fs.readFileSync("./blackList.json");
const b = JSON.parse(blackList);

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'User Unauthorized! Please Open an Account!' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email }; // Attach user object with userId to the request
    const check = b.includes(decoded.email);
    if (check) {
      return res.status(403).json({ message: 'User Unauthorized! Please Open an Account!' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  verifyToken,
};
