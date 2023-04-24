const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../../controllers/api/categories");

router.get("/create", categoriesCtrl.create);
// router.post("/delete/:id", categoriesCtrl.delete);

module.exports = router;