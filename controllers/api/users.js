const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Category = require("../../models/category");
const Snippet = require("../../models/snippet");

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

async function update(req, res) {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(newUser);
    res.json(newUser);
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

async function fetchForCommunityPage(req, res) {
  try {
    let returnObject = [];

    const users = await User.find();

    for (const user of users) {
      if (user.communityPref) {
        let userObject = {};
        userObject["name"] = user.username;
        userObject["profile_pic"] = user.profilePic;

        userObject["user_since"] = new Date(
          user.createdAt
        ).toLocaleDateString();
        const catsForUser = await Category.find({ user: user._id });

        let snippetCount = 0;
        let highest = 0;
        let highestCat = {};

        for (const cat of catsForUser) {
          const snippets = await Snippet.find({ category: cat._id });

          if (snippets.length > highest) {
            highest = snippets.length;
            highestCat = cat;
          }

          snippetCount += snippets.length;
        }

        userObject["snippet_count"] = snippetCount;
        userObject["highest_category"] = highestCat.name;
        returnObject.push(userObject);
      }
    }

    res.json(returnObject);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  checkToken,
  login,
  create,
  fetchUsers,
  fetchOneUser,
  fetchOneById,
  fetchForCommunityPage,
  update,
};
