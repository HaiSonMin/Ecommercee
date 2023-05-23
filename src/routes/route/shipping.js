const express = require("express");
const router = express.Router();

const { createShipping, getAllShipping, getShipping, updateShipping, deleteShipping } = require("../../controllers/shipping.controller");

router.route("/").get(getAllShipping).post(createShipping);
router.route("/:id").get(getShipping).patch(updateShipping).delete(deleteShipping);

module.exports = router;
