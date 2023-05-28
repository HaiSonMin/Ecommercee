const { BadRequestError, NotFoundError } = require("../../core/error.response");
const { createDiscount, findOneDiscount, updateDiscount, findAllDiscount } = require("../../models/Repositories/discount.repo");
const { getAllProducts } = require("../../models/Repositories/shop.repo");
const { getUnSelectData, convertObjectIdMongo } = require("../../utils/index");

class DiscountService {
  static async createDiscountCode(payload) {
    const {
      discount_name,
      discount_description,
      discount_type,
      discount_code,
      discount_value,
      discount_start_date,
      discount_end_date,
      discount_max_uses,
      discount_use_count,
      discount_user_used,
      discount_max_uses_per_user,
      discount_min_order_value,
      discount_by_shopId,
      discount_is_active,
      discount_applies_to,
      discount_product_specific,
    } = payload;
    // Check validation
    if (new Date(discount_start_date) > new Date() || new Date(discount_end_date) < new Date()) {
      throw new BadRequestError("Discount has expired");
    }
    if (new Date(discount_start_date) > new Date(discount_end_date)) {
      throw new BadRequestError("State date must be less than end date");
    }
    const findDiscount = await findOneDiscount({ discount_code, discount_by_shopId });
    if (findDiscount && findDiscount.discount_is_active) throw new BadRequestError("Discount exists");

    const newDiscount = await createDiscount(payload);
    return newDiscount;
  }

  static async updateDiscount(discount_id, payload) {
    const discountUpdated = await updateDiscount(discount_id, payload);
    return discountUpdated;
  }

  static async getAllProductWithDiscountCode({ discount_code, discount_by_shopId, limit, page }) {
    const fondDiscount = await findOneDiscount({ discount_code, discount_by_shopId });
    console.log("fondDiscount:::::", fondDiscount);
    if (!fondDiscount || !fondDiscount.discount_is_active) throw new NotFoundError("Discount dost not exists");

    const { discount_applies_to, discount_product_specific } = fondDiscount;

    let products;
    if (discount_applies_to === "all") {
      products = await getAllProducts({
        limit: +limit,
        page: +page,
        sort: "ctime",
        filter: { product_shopId: discount_by_shopId, isPublished: true },
        select: ["product_name", "product_price", "product_type"],
      });
    } else {
      products = await getAllProducts({
        limit: +limit,
        page: +page,
        sort: "ctime",
        filter: { _id: { $in: discount_product_specific }, isPublished: true },
        select: ["product_name", "product_price", "product_type"],
      });
    }
    return products;
  }

  static async getAllDiscountByShop({ discount_by_shopId, limit, page }) {
    const filter = {
      discount_by_shopId: convertObjectIdMongo(discount_by_shopId),
    };
    const unSelect = getUnSelectData(["__v"]);
    const discounts = await findAllDiscount({ filter, limit, page, unSelect });
    return discounts;
  }
}

module.exports = DiscountService;
