const express = require("express");
const router = express.Router();

const { createDiscount, getAllProductWithDiscountCode, getAllDiscountByShop } = require("../controllers/discount.controller");
const { authentication } = require("../auth/authUtils");

router.use(authentication);
router.route("/").post(createDiscount);
router.route("/products").get(getAllProductWithDiscountCode);
router.route("/shop").get(getAllDiscountByShop);

module.exports = router;
