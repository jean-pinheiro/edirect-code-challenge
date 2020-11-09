const jwt = require('jsonwebtoken');

var auth = module.exports = {};

auth.validateToken = function(req, res, next) {
  var token = req.headers['x-access-token'];
  console.log(token);
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.TOKEN, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.body.userId = decoded.id;
      next();
    });
}