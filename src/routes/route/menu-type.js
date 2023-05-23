const express = require("express");
const router = express.Router();

const { createMenuType, getAllMenuType, getMenuType, updateMenuType, deleteMenuType } = require("../../controllers/menu-type.controller");

router.route("/").get(getAllMenuType).post(createMenuType);
router.route("/:id").get(getMenuType).patch(updateMenuType).delete(deleteMenuType);

module.exports = router;
