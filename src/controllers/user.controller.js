const UserService = require("../services/access.service");
const { OK, CREATED } = require("../core/success.response");

const signUp = async (req, res) => {
  // console.log(`[P]::SignUp::${JSON.stringify(req.body)}`);
  const dataUser = await UserService.signUp(req.body);
  new CREATED({
    message: "Signup successfully",
    metadata: dataUser,
  }).send(res);
  //   const user = await User.create(req.body);

  //   const token = user.createJWT();

  //   res
  //     .status(StatusCodes.CREATED)
  //     .json({ user: { username: user.getUsername(), fullName: user.getFullName(), email: user.getEmail() }, msg: "Register successfully", token });
};

const login = async (req, res) => {
  const dataUser = await UserService.logIn(req.body);
  new OK({
    message: "Login successfully",
    metadata: dataUser,
  }).send(res);
};

const logout = async (req, res) => {
  const dataUser = await UserService.logout(req.keyStore);
  new OK({
    message: "Logout successfully",
    metadata: dataUser,
  }).send(res);
};

const handlerRefreshToken = async (req, res) => {
  const { keyStore, user, refreshToken } = req;
  const dataUser = await UserService.handlerRefreshTokenV2({ keyStore, user, refreshToken });
  new OK({
    message: "Get token success",
    metadata: dataUser,
  }).send(res);
};

const getAllUser = async (req, res) => {};
const getUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

module.exports = {
  signUp,
  login,
  logout,
  handlerRefreshToken,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
