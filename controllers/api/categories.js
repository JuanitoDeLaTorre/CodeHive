const Category = require("../../models/category")


// create a new category
async function create(req, res) {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.json(savedCategory);
  }











module.exports = {
    create,
  };