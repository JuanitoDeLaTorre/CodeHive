const express = require("express");
const router = express.Router();
const snippetsController = require("../../controllers/api/snippets");

router.post("/create", snippetsController.create);
router.put("/update/:id", snippetsController.update);
router.delete("/delete/:id", snippetsController.remove);
router.get("/fetchSnips/:category_id", snippetsController.getAllSnipsForCats);
router.get(
  "/fetchSnipsForUser/:user_id",
  snippetsController.returnSnipsForUser
);
router.get(
  "/fetchSnipsForCat/:category_id",
  snippetsController.returnSnipsForCat
);
router.get("/fetchOne/:snip_id", snippetsController.fetchOne);
router.post("/copy/:catID/:snipID", snippetsController.copy);

module.exports = router;
