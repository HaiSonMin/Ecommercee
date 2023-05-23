const { ApiKeyModel } = require("../models/index");
const crypto = require("crypto");
const findById = async (key) => {
  // Test create Api key
  //   const newApiKey = await ApiKeyModel.create({ key: crypto.randomBytes(64).toString("hex"), permissions: ["0000"] });
  //   console.log(newApiKey);
  const objKey = await ApiKeyModel.findOne({ key, status: true }).lean().exec();
  return objKey;
};

module.exports = { findById };
