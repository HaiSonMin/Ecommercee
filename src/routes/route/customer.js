const express = require("express");
const router = express.Router();

const { createCustomer, getAllCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../../controllers/customer.controller");

router.route("/").get(getAllCustomer).post(createCustomer);
router.route("/:id").get(getCustomer).patch(updateCustomer).delete(deleteCustomer);

module.exports = router;
