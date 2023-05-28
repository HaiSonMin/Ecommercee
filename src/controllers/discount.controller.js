const { OK, CREATED } = require("../core/success.response");
const DiscountService = require("../services/shop/discount.service");
const createDiscount = async (req, res) => {
  const optionProduct = {
    ...req.body,
    discount_by_shopId: req.user.userId,
  };
  new CREATED({
    message: "Create discount successfully",
    metadata: await DiscountService.createDiscountCode(optionProduct),
  }).send(res);
};

const getAllProductWithDiscountCode = async (req, res) => {
  const { discount_code, discount_by_shopId, limit, page } = req.query;
  console.log("Query::::::;", req.query);
  new OK({
    message: "Get all product with discount code successfully",
    metadata: await DiscountService.getAllProductWithDiscountCode({ discount_code, discount_by_shopId, limit, page }),
  }).send(res);
};

const getAllDiscountByShop = async (req, res) => {
  const { discount_by_shopId, limit, page } = req.query;
  new OK({
    message: "Get all discount successfully",
    metadata: await DiscountService.getAllDiscountByShop({ discount_by_shopId, limit, page }),
  }).send(res);
};

module.exports = { createDiscount, getAllProductWithDiscountCode, getAllDiscountByShop };
