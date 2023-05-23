const express = require("express");
const router = express.Router();

const { createShipper, getAllShipper, getShipper, updateShipper, deleteShipper } = require("../../controllers/shipper.controller");

router.route("/").get(getAllShipper).post(createShipper);
router.route("/:id").get(getShipper).patch(updateShipper).delete(deleteShipper);

module.exports = router;
