const express = require("express");
const router = express.Router();
const snippetsController = require("../../controllers/api/snippets");

router.post("/create", snippetsController.create);
router.put("/update/:id", snippetsController.update);
router.delete("/delete/:id", snippetsController.remove);

module.exports = router;
