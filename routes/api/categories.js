const express = require("express");
const router = express.Router();
const categoriesCtrl = require("../../controllers/api/categories");

router.post("/create", categoriesCtrl.create);
router.put("/update/:id", categoriesCtrl.update);
router.delete("/delete/:id", categoriesCtrl.remove);
router.get("/fetchOne/:id", categoriesCtrl.fetchOne);
router.get("/fetchCats/:user_id", categoriesCtrl.getAllCatsForUser);

module.exports = router;
