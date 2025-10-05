const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Not Logged In');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); 
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};
