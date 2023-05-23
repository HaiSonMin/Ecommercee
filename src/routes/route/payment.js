const express = require("express");
const router = express.Router();

const { createPayment, getAllPayment, getPayment, updatePayment, deletePayment } = require("../../controllers/payment.controller");

router.route("/").get(getAllPayment).post(createPayment);
router.route("/:id").get(getPayment).patch(updatePayment).delete(deletePayment);

module.exports = router;
