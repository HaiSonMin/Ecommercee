const ProductFactory = require("../services/shop/shop.service");
const { OK, CREATED } = require("../core/success.response");

const createProduct = async (req, res) => {
  const productType = req.body.product_type;
  const optionProduct = {
    ...req.body,
    product_shopId: req.user.userId,
  };
  new CREATED({
    message: "Create product successfully",
    metadata: await ProductFactory.createProduct(productType, optionProduct),
  }).send(res);
};

/**
 * @param {String} shopId #Get ShopId from req.user (Authentication)
 * @param {*} req
 * @param {*} res
 * @returns {JSON} #All information related to Product
 */
const getAllProductIsDraft = async (req, res) => {
  new OK({
    message: "Get all product is draft successfully",
    metadata: await ProductFactory.getAllProductIsDraft({ product_shopId: req.user.userId }),
  }).send(res);
};

const getAllProductIsPublish = async (req, res) => {
  new OK({
    message: "Get all product is publish successfully",
    metadata: await ProductFactory.getAllProductIsPublished({ product_shopId: req.user.userId }),
  }).send(res);
};

const getProductsByUser = async (req, res) => {
  new OK({
    message: "Search products successfully",
    metadata: await ProductFactory.getProductsByUser({ keySearch: req.params.keySearch }),
  }).send(res);
};

const getAllProducts = async (req, res) => {
  new OK({
    message: "Get all products successfully",
    metadata: await ProductFactory.getAllProducts(req.query),
  }).send(res);
};

const getProduct = async (req, res) => {
  new OK({
    message: "Get product successfully",
    metadata: await ProductFactory.getProduct({ product_id: req.params.productId }),
  }).send(res);
};

const updateProductIsDraftToPublish = async (req, res) => {
  new OK({
    message: "Get all product is publish successfully",
    metadata: await ProductFactory.updateProductIsDraftToPublish({ product_id: req.params.productId, product_shopId: req.user.userId }),
  }).send(res);
};

const updateProductIsPublishedToDraft = async (req, res) => {
  new OK({
    message: "Get all products is publish successfully",
    metadata: await ProductFactory.updateProductIsPublishedToDraft({ product_id: req.params.productId, product_shopId: req.user.userId }),
  }).send(res);
};

const updateProductById = async (req, res) => {
  const productType = req.body.product_type;
  new OK({
    message: "Update product successfully",
    metadata: await ProductFactory.updateProduct(productType, req.params.productId, {
      ...req.body,
      product_shopId: req.user.userId,
    }),
  }).send(res);
};

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByUser,
  getAllProductIsDraft,
  getAllProductIsPublish,
  updateProductById,
  updateProductIsDraftToPublish,
  updateProductIsPublishedToDraft,
};
