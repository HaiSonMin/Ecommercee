const { ProductModel, BookModel, ClothingModel, ElectronicModel, FurnitureModel, KitchenToolModel } = require("../../models/index");
const { BadRequestError } = require("../../core/error.response");
const { Types } = require("mongoose");
const {
  getProduct,
  getAllProducts,
  getProductsByUser,
  getAllProductIsDraft,
  getAllProductIsPublished,
  updateProductById,
  updateProductIsDraftToPublish,
  updateProductIsPublishedToDraft,
} = require("../../models/Repositories/shop.repo");
const { createInventory } = require("../../models/Repositories/inventory.repo");
const { removeObjectFieldNull, updateNestedObjectParser } = require("../../utils");

// Factory pattern

class ProductFactory {
  static objectRegistry = {}; // Key-Value

  static registerObjectType(type, classReference) {
    ProductFactory.objectRegistry[type] = classReference;
  }

  static async createProduct(type, payload) {
    const classReference = ProductFactory.objectRegistry[type];
    if (!classReference) throw new BadRequestError(`Invalid product type ${type}`);
    return new classReference(payload).createProduct();
  }

  // --------------- Get ---------------
  static async getAllProductIsDraft({ product_shopId, limit = 50, skip = 0 }) {
    const query = { product_shopId, isDraft: true };
    return await getAllProductIsDraft({ query, limit, skip });
  }

  static async getAllProductIsPublished({ product_shopId, limit = 50, skip = 0 }) {
    const query = { product_shopId, isPublished: true };
    return await getAllProductIsPublished({ query, limit, skip });
  }

  static async getProductsByUser({ keySearch }) {
    return await getProductsByUser({ keySearch });
  }

  static async getAllProducts({ limit = 50, page = 1, sort = "ctime", filter = { isPublished: true } }) {
    // const option = {
    //   limit: 50,
    //   page: 1,
    //   sort: "ctime",
    //   filter: { isPublished: true },
    //   select: {
    //     product_name: 1,
    //     product_price: 1,
    //     product_thumb: 1,
    //   },
    // };
    // return await getAllProducts(option);
    return await getAllProducts({ limit, page, sort, filter, select: ["product_name", "product_price", "product_type", "product_thumb"] });
  }

  static async getProduct({ product_id, unSelected = ["__v"] }) {
    return await getProduct({ product_id, unSelected });
  }

  // --------------- Patch ---------------
  static async updateProductIsDraftToPublish({ product_shopId, product_id }) {
    return await updateProductIsDraftToPublish({ product_shopId, product_id });
  }

  static async updateProductIsPublishedToDraft({ product_shopId, product_id }) {
    return await updateProductIsPublishedToDraft({ product_shopId, product_id });
  }

  static async updateProduct(type, product_id, payload) {
    const classReference = ProductFactory.objectRegistry[type];
    if (!classReference) throw new BadRequestError(`Invalid product type ${type}`);
    return new classReference(payload).updateProduct(product_id);
  }
}

class Product {
  constructor({
    product_name,
    product_price,
    product_thumb,
    product_quantity,
    product_ratingAverage,
    product_description,
    product_type,
    product_shopId,
    product_attributes,
  }) {
    this.product_shopId = product_shopId; // Get from accessToken
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_quantity = product_quantity;
    this.product_ratingAverage = product_ratingAverage;
    this.product_type = product_type;
    this.product_attributes = product_attributes;
  }

  async createProduct({ payload = null, idOfType }) {
    // this = {
    // Product_name : Product_name;
    // Product_thumb : Product_thumb;
    // Product_ingredients : Product_ingredients;
    // Product_status : Product_status;
    // Product_type : Product_type;
    // }
    const newProduct = await ProductModel.create({ ...this, _id: idOfType });
    // If create product success then we will also create a inventory
    if (newProduct) {
      const payload = {
        product_name: newProduct.product_name,
        product_id: newProduct._id,
        stock: newProduct.product_quantity,
        shop_id: newProduct.product_shopId,
      };
      await createInventory(payload);
    }
    return newProduct;
  }

  async updateProduct({ product_id, payload }) {
    return await updateProductById({ product_id, payload, Model: ProductModel });
  }
  async deleteProduct() {
    // this = {
    // Product_name : Product_name;
    // Product_thumb : Product_thumb;
    // Product_ingredients : Product_ingredients;
    // Product_status : Product_status;
    // Product_type : Product_type;
    // }
    return await ProductModel.create(this);
  }
}

class Book extends Product {
  constructor(payload) {
    super(payload);
  }
  async createProduct() {
    const optionBook = {
      ...this.product_attributes,
      book_shopId: this.product_shopId,
    };
    const newBook = await BookModel.create(optionBook);
    if (!newBook) throw new BadRequestError("Create Book error");

    const newProduct = await super.createProduct({ idOfType: newBook._id });
    return newProduct;
  }

  async updateProduct(product_id) {
    const payload = updateNestedObjectParser(this);
    const lastResult = removeObjectFieldNull(payload);

    if (this.product_attributes) {
      // Update child
      await updateProductById({ product_id, payload: lastResult.product_attributes, Model: FurnitureModel });
    }

    const productUpdated = await super.updateProduct({ product_id, payload: lastResult });
    return productUpdated;
  }

  // async createProduct() {
  //   const optionBook = {
  //     ...this.product_attributes,
  //     book_shopId: this.product_shopId,
  //   };
  //   const newBook = await BookModel.create(optionBook);
  //   if (!newBook) throw new BadRequestError("Create book error");

  //   const payload = {
  //     ...this,
  //     product_attributes: newBook,
  //   };

  //   // Id of product === id of type in time create
  //   const newProduct = await super.createProduct(payload, newBook._id);
  //   return newProduct;
  // }
}
class Furniture extends Product {
  constructor(payload) {
    super(payload);
  }
  async createProduct() {
    const optionFurniture = {
      ...this.product_attributes,
      furniture_shopId: this.product_shopId,
    };
    const newFurniture = await FurnitureModel.create(optionFurniture);
    if (!newFurniture) throw new BadRequestError("Create furniture error");

    const newProduct = await super.createProduct({ idOfType: newFurniture._id });
    return newProduct;
  }

  async updateProduct(product_id) {
    const payload = updateNestedObjectParser(this);
    const lastResult = removeObjectFieldNull(payload);

    if (this.product_attributes) {
      // Update child
      await updateProductById({ product_id, payload: lastResult.product_attributes, Model: FurnitureModel });
    }

    const productUpdated = await super.updateProduct({ product_id, payload: lastResult });
    return productUpdated;
  }

  // Display all info of product_attributes (Optional)
  // async createProduct() {
  //   const optionFurniture = {
  //     ...this.product_attributes,
  //     furniture_shopId: this.product_shopId,
  //   };
  //   const newFurniture = await FurnitureModel.create(optionFurniture);
  //   if (!newFurniture) throw new BadRequestError("Create book error");

  //   const payload = {
  //     ...this,
  //     product_attributes: newFurniture,
  //   };

  //   const newProduct = await super.createProduct(payload, newFurniture._id);
  //   return newProduct;
  // }
}
class Clothing extends Product {
  constructor(payload) {
    super(payload);
  }

  async createProduct() {
    const optionClothing = {
      ...this.product_attributes,
      clothing_shopId: this.product_shopId,
    };
    const newClothing = await ClothingModel.create(optionClothing);
    if (!newClothing) throw new BadRequestError("Create clothing error");

    const newProduct = await super.createProduct({ idOfType: newClothing._id });
    return newProduct;
  }

  // async createProduct() {
  //   const optionClothing = {
  //     ...this.product_attributes,
  //     clothing_shopId: this.product_shopId,
  //   };
  //   const newClothing = await ClothingModel.create(optionClothing);
  //   if (!newClothing) throw new BadRequestError("Create book error");

  //   const payload = {
  //     ...this,
  //     product_attributes: newClothing,
  //   };

  //   const newProduct = await super.createProduct(payload, newClothing._id);
  //   return newProduct;
  // }
}
class Electronic extends Product {
  constructor(payload) {
    super(payload);
  }

  async createProduct() {
    const optionElectronic = {
      ...this.product_attributes,
      electronic_shopId: this.product_shopId,
    };
    const newElectronic = await ElectronicModel.create(optionElectronic);
    if (!newElectronic) throw new BadRequestError("Create Electronic error");

    const newProduct = await super.createProduct({ idOfType: newElectronic._id });
    return newProduct;
  }

  // async createProduct() {
  //   const optionElectronic = {
  //     ...this.product_attributes,
  //     electronic_shopId: this.product_shopId,
  //   };
  //   const newElectronic = await ElectronicModel.create(optionElectronic);
  //   if (!newElectronic) throw new BadRequestError("Create book error");

  //   const payload = {
  //     ...this,
  //     product_attributes: newElectronic,
  //   };

  //   const newProduct = await super.createProduct(payload, newElectronic._id);
  //   return newProduct;
  // }
}
class KitchenTool extends Product {
  constructor(payload) {
    super(payload);
  }

  async createProduct() {
    const optionKitchenTool = {
      ...this.product_attributes,
      kitchenTool_shopId: this.product_shopId,
    };
    const newKitchenTool = await KitchenToolModel.create(optionKitchenTool);
    if (!newKitchenTool) throw new BadRequestError("Create KitchenTool error");

    const newProduct = await super.createProduct({ idOfType: newKitchenTool._id });
    return newProduct;
  }

  // async createProduct() {
  //   const optionKitchenTool = {
  //     ...this.product_attributes,
  //     kitchenTool_shopId: this.product_shopId,
  //   };
  //   const newKitchenTool = await KitchenToolModel.create(optionKitchenTool);
  //   if (!newKitchenTool) throw new BadRequestError("Create book error");

  //   const payload = {
  //     ...this,
  //     product_attributes: newKitchenTool,
  //   };

  //   const newProduct = await super.createProduct(payload, newKitchenTool._id);
  //   return newProduct;
  // }
}

ProductFactory.registerObjectType("Electronic", Electronic);
ProductFactory.registerObjectType("Clothing", Clothing);
ProductFactory.registerObjectType("Furniture", Furniture);
ProductFactory.registerObjectType("KitchenTool", KitchenTool);
ProductFactory.registerObjectType("Book", Book);

module.exports = ProductFactory;
