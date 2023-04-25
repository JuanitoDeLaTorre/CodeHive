const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../../controllers/api/categories");

router.post("/create", categoriesCtrl.create);
router.delete("/delete/:id", categoriesCtrl.delete);

module.exports = router;
