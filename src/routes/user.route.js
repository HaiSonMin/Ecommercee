const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/authUtils");

const { signUp, login, logout, handlerRefreshToken, getAllUser, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.use(authentication);
router.route("/logout").post(logout);
router.route("/handlerRefreshToken").post(handlerRefreshToken);
router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
