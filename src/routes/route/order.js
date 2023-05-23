const express = require("express");
const router = express.Router();

const { createOrder, getAllOrder, getOrder, updateOrder, deleteOrder } = require("../../controllers/order.controller");

router.route("/").get(getAllOrder).post(createOrder);
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
