const express = require("express");
const router = express.Router();

const {
  createOrderDetail,
  getAllOrderDetail,
  getOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
} = require("../../controllers/order-detail.controller");

router.route("/").get(getAllOrderDetail).post(createOrderDetail);
router.route("/:id").get(getOrderDetail).patch(updateOrderDetail).delete(deleteOrderDetail);

module.exports = router;
