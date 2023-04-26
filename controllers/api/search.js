const User = require("../models/user");
const Category = require("../models/category");
const Snippet = require("../models/snippet");

async function search(query) {
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    });
    similarUsers = await User.find({
      username: { $regex: query.split(" ").join("|"), $options: "i" },
    });

    const categories = await Category.find({
      name: { $regex: query, $options: "i" },
    });
    const similarCategories = await Category.find({
      name: { $regex: query.split(" ").join("|"), $options: "i" },
    });

    const snippets = await Snippet.find({
      title: { $regex: query, $options: "i" },
    });
    const similarSnippets = await Snippet.find({
      title: { $regex: query.split(" ").join("|"), $options: "i" },
    });

    return {
      users,
      categories,
      snippets,
      similarUsers,
      similarCategories,
      similarSnippets,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = { search };
