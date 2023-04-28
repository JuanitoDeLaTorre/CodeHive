const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

async function checkToken(req, res) {
  res.json(req.exp);
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);

    const token = createJWT(user);

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

async function fetchUsers(req, res) {
  const allUsers = await User.find();

  res.json(allUsers);
}

async function fetchOneUser(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  } catch (err) {
    // console.log(err);
    console.log("err");
  }
}
async function fetchOneById(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    // console.log(err);
    console.log("err");
  }
}

module.exports = {
  checkToken,
  login,
  create,
  fetchUsers,
  fetchOneUser,
  fetchOneById,
};
