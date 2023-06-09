const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.get("Authorization");
  // console.log(req);
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      req.user = err ? null : decoded.user;
      req.exp = err ? null : new Date(decoded.exp * 1000);
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
};
