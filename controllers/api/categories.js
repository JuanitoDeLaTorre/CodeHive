const Category = require("../../models/category")



async function create(req,res){
    const category = await Category.create(req.body)
}











module.exports = {
    create,
  };