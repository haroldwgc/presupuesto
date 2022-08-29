const jwt = require('jsonwebtoken');

module.exports = function generateAccesToken(user) {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: '5m'
  });
};

module.exports = function validateToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) res.send({
    code: 400,
    error: "Acceso denegado"
  });
  jwt.verify(accessToken, process.env.SECRET, (err, username) => {
    if (err) {
      res.send({
        code: 400,
        error: "Token incorecto"
      });
      console.log({
        code: 400,
        error: "Token incorecto"
      });
    } else {
      next();
    }
  });
};