const jwt = require("jsonwebtoken");
const Category = require("../../models/category");
const User = require("../../models/user");

// create a new category
async function create(req, res) {
  try {
    const category = await Category.create({
      name: "ALLO",
      description: "THIS IS ME",
      user: req.user._id,
    });

    console.log("This", req.user._id);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function remove(req, res) {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

module.exports = {
  create,
  remove,
};
