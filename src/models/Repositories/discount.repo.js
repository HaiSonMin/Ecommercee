const { DiscountModel } = require("../../models/index");
const { convertObjectIdMongo, removeObjectFieldNull } = require("../../utils/index");
const createDiscount = async (payload) => {
  const optionCreate = {
    discount_name: payload.discount_name,
    discount_description: payload.discount_description,
    discount_type: payload.discount_type,
    discount_code: payload.discount_code,
    discount_value: payload.discount_value,
    discount_start_date: new Date(payload.discount_start_date),
    discount_end_date: new Date(payload.discount_end_date),
    discount_max_uses: payload.discount_max_uses,
    discount_use_count: payload.discount_use_count,
    discount_user_used: payload.discount_user_used,
    discount_max_uses_per_user: payload.discount_max_uses_per_user,
    discount_min_order_value: payload.discount_min_order_value || 0,
    discount_by_shopId: convertObjectIdMongo(payload.discount_by_shopId),
    discount_is_active: payload.discount_is_active,
    discount_applies_to: payload.discount_applies_to,
    discount_product_specific: payload.discount_applies_to === "all" ? [] : payload.discount_product_specific,
  };
  const newDiscount = await DiscountModel.create(optionCreate);
  return newDiscount;
};

const findOneDiscount = async ({ discount_code, discount_by_shopId }) => {
  const discount = await DiscountModel.findOne({ discount_code, discount_by_shopId: convertObjectIdMongo(discount_by_shopId) })
    .lean()
    .exec();
  return discount;
};

const findAllDiscount = async ({ filter, limit, page, sort = "ctime", unSelect }) => {
  const skip = (+page - 1) * limit;
  const discounts = await DiscountModel.find(filter)
    .populate("discount_by_shopId")
    .sort(sort)
    .select(unSelect)
    .skip(skip)
    .limit(+limit)
    .lean()
    .exec();
  console.log("discounts::::", discounts);
  return discounts;
};

const updateDiscount = async (discount_id, payload) => {
  const valueUpdate = removeObjectFieldNull(payload);
  const discountUpdated = await DiscountModel.findByIdAndUpdate(discount_id, valueUpdate, { new: true, runValidators: true }).lean().exec();
  return discountUpdated;
};

module.exports = {
  createDiscount,
  findOneDiscount,
  findAllDiscount,
  updateDiscount,
};
