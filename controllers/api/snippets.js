const Snippet = require("../models/snippet");
const Category = require("../models/category");

async function create(req, res) {
  try {
    const snippet = await Snippet.create({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      description: req.body.description,
    });

    res.status(201).json( snippet );
  } catch (err) {
    res.status(400).json( err );
    console.log(err);
  }
}


async function update(req, res) {
    try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(snippet);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

moduel.exports = {
  create,
  update,
  remove,
};
