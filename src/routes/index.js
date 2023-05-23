const express = require("express");
const app = express();
const router = express.Router();

const routerCustomer = require("./route/customer");
const routerMenuType = require("./route/menu-type");
const routerMenu = require("./route/menu");
const routerOrderDetail = require("./route/order-detail");
const routerOrder = require("./route/order");
const routerPayment = require("./route/payment");
const routerShipper = require("./route/shipper");
const routerShipping = require("./route/shipping");
const routerSiteInfo = require("./route/site-info");
const routerUser = require("./route/user");
const { apiKey, permission } = require("../auth/checkAuth");

// Authentication
router.use(apiKey); // Check Api Key
router.use(permission("0000")); // Check Permissions

router.use("/api/v1/customer", routerCustomer);
router.use("/api/v1/menu", routerMenu);
router.use("/api/v1/menu-type", routerMenuType);
router.use("/api/v1/order", routerOrder);
router.use("/api/v1/order-detail", routerOrderDetail);
router.use("/api/v1/payment", routerPayment);
router.use("/api/v1/shipper", routerShipper);
router.use("/api/v1/shipping", routerShipping);
router.use("/api/v1/site-info", routerSiteInfo);
router.use("/api/v1/user", routerUser);

module.exports = router;
