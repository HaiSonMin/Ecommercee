const { NotFoundError } = require("../core/error.response");
const { KeyTokenModel } = require("../models/index");
class KeyTokenService {
  static createKeyTokens = async ({ userId, publicKey, privateKey, refreshTokenUsing }) => {
    // const token = await KeyTokenModel.create({ userId, publicKey, privateKey });

    const filter = { userId };
    const dataUpdate = {
      publicKey,
      privateKey,
      refreshTokenUsing,
      refreshTokenUsed: [],
    };
    const options = {
      upsert: true,
      new: true,
    };

    const tokens = await KeyTokenModel.findOneAndUpdate(filter, dataUpdate, options);

    return tokens ? tokens.publicKey : null;
    // return null;
  };

  static findByUserId = async function (userId) {
    return await KeyTokenModel.findOne({ userId });
  };

  static deleteById = async function (id) {
    return await KeyTokenModel.deleteOne({ _id: id }).lean();
  };

  static findRefreshTokenUsed = async function (refreshToken) {
    return await KeyTokenModel.findOne({ refreshTokenUsed: refreshToken }).lean();
  };

  static findByRefreshToken = async function (refreshToken) {
    return await KeyTokenModel.findOne({ refreshTokenUsing: refreshToken });
  };

  static deleteTokenByUserId = async function (userId) {
    await KeyTokenModel.deleteOne({ userId }).lean();
  };
}
module.exports = KeyTokenService;
