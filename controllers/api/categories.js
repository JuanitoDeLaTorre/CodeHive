const jwt = require("jsonwebtoken");
const Category = require("../../models/category");
const User = require("../../models/user");

// create a new category
async function create(req, res) {
  try {
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      user: req.user._id,
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function update(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
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

async function getAllCatsForUser(req, res) {
  try {
    const categories = await Category.find({ user: req.params.user_id });
    res.json(categories);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function fetchOne(req, res) {
  const category = await Category.findById(req.params.id);
  res.json(category);
}

module.exports = {
  create,
  remove,
  getAllCatsForUser,
  update,
  fetchOne,
};
