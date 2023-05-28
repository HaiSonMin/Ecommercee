const { UserModel } = require("../../models/index");
const findUserByEmail = async (email, select = { fullName: 1, username: 1, email: 1, password: 1 }) => {
  const user = await UserModel.findOne({ email }).select(select).lean();
  return user;
};
module.exports = { findUserByEmail };
