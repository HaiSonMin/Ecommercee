const express = require("express");
const router = express.Router();

const routerProduct = require("./product.route");
const routerDiscount = require("./discount.route");
const routerUser = require("./user.route");
const { apiKey, permission } = require("../auth/checkAuth");

// Authentication
router.use(apiKey); // Check Api Key
router.use(permission("0000")); // Check Permissions

router.use("/api/v1/product", routerProduct);
router.use("/api/v1/discount", routerDiscount);
router.use("/api/v1/user", routerUser);

module.exports = router;
