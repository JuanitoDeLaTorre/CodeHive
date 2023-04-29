const User = require("../../models/user");
const Category = require("../../models/category");
const Snippet = require("../../models/snippet");

async function search(req, res) {
  try {
    const query = req.params.query;
    const users = await User.find({ username: { $regex: query, $options: "i" } });
    const categories = await Category.find({ name: { $regex: query, $options: "i" } }).populate('user', 'username');
    const snippets = await Snippet.find({ title: { $regex: query, $options: "i" } });
    res.json({ users, categories, snippets });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { search };

