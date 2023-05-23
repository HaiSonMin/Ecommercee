// const express = require("express");
// const router = express.Router();
const CustomerModel = require("./Collections/customer.model");
const MenuModel = require("./Collections/menu.model");
const MenuTypeModel = require("./Collections/menu-type.model");
const OrderModel = require("./Collections/order.model");
const OrderDetailModel = require("./Collections/order-detail.model");
const PaymentModel = require("./Collections/payment.model");
const ShipperModel = require("./Collections/shipper.model");
const ShippingModel = require("./Collections/shipping.model");
const SiteInfoModel = require("./Collections/site-info.model");
const UserModel = require("./Collections/user.model");
const KeyTokenModel = require("./Collections/keytoken.model");
const ApiKeyModel = require("./Collections/apiKey.model");

// router.get("/", (req, res) => res.send("<h1>Hello App Delivery</h1>"));

module.exports = {
  CustomerModel,
  MenuModel,
  MenuTypeModel,
  OrderModel,
  OrderDetailModel,
  PaymentModel,
  ShipperModel,
  ShippingModel,
  SiteInfoModel,
  UserModel,
  KeyTokenModel,
  ApiKeyModel,
};
