const express = require("express");
const router = express.Router();

const { createMenu, getAllMenu, getMenu, updateMenu, deleteMenu } = require("../../controllers/menu.controller");

router.route("/").get(getAllMenu).post(createMenu);
router.route("/:id").get(getMenu).patch(updateMenu).delete(deleteMenu);

module.exports = router;
