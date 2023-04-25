const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

async function checkToken(req, res) {
  console.log("req.user -> ", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);

    const token = createJWT(user);

    console.log(token);

    res.json(token);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) throw new Error("NO User Found");
    const matchedPassword = bcrypt.compare(req.body.password, user.password);
    if (!matchedPassword) throw new Error("Password incorrect");
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = {
  checkToken,
  login,
  create,
};
