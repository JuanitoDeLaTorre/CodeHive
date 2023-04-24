const Category = require("../../models/category");

// create a new category
async function create(req, res) {
  // try {
  //   const category = await Category.create({
  //     name: req.body.name,
  //     description: req.body.description,
  //     user: req.user._id
  //   });
  //   res.json(category);
  // } catch (err) {
  //   res.status(400).json(err);
  //   console.log(err);
  // }
  res.json({"body": "create"})
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
  remove
};
