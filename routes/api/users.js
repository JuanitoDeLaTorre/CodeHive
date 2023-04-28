const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/fetchUsers", usersCtrl.fetchUsers);
router.get("/fetchOneUser/:username", usersCtrl.fetchOneUser);
router.get("/fetchOneById/:id", usersCtrl.fetchOneById);
router.get("/fetchForCommunityPage", usersCtrl.fetchForCommunityPage);

module.exports = router;
