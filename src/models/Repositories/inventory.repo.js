const { InventoryModel } = require("../index");

const createInventory = async ({ product_name, product_id, stock, shop_id, location = "unKnow" }) => {
  const payload = {
    inventory_name: product_name,
    inventory_productId: product_id,
    inventory_location: location,
    inventory_stock: stock,
    inventory_shopId: shop_id,
  };
  const newInventory = await InventoryModel.create(payload);
  return newInventory;
};

module.exports = { createInventory };
