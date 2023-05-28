const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByUser,
  getAllProductIsDraft,
  getAllProductIsPublish,
  updateProductById,
  updateProductIsDraftToPublish,
  updateProductIsPublishedToDraft,
} = require("../controllers/product.controller");

const { authentication } = require("../auth/authUtils");

router.route("/").get(getAllProducts);
router.route("/:productId").get(getProduct);
router.route("/search/:keySearch").get(getProductsByUser);

// Authentication
router.use(authentication);
//////////////////////////

// ------------ GET ------------
router.route("/draft/all").get(getAllProductIsDraft);
router.route("/published/all").get(getAllProductIsPublish);

// ------------ POST -------------
router.route("/").post(createProduct);

// ------------ PATCH ------------
router.route("/:productId").patch(updateProductById);
router.route("/draft/:productId").patch(updateProductIsDraftToPublish);
router.route("/published/:productId").patch(updateProductIsPublishedToDraft);

module.exports = router;
