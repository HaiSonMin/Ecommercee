const { UserModel } = require("../../models/index");
const { BadRequestError, NotFoundError, ForbiddenError, UnauthenticatedError } = require("../../core/error.response");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../../auth/authUtils");
const { getInfoData } = require("../../utils");
const { findUserByEmail } = require("./user.service");
const createKeys = require("../../utils/createKey");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const ROLE_USER = {
  ADMIN: "ADMIN",
  SHOP: "CUSTOMER",
  USER: "USER",
};

class UserService {
  static handlerRefreshToken = async ({ keyStore, user, refreshToken }) => {
    // ---------- Step By Step ----------
    // 1.Check token has been used or not
    // 2.Check refreshToken available valid
    // 3.Check user available valid
    // 4.Create new tokens
    // 5.Push refreshToken to "refreshTokenUsed"
    //
    // 1.Check token has been used or not
    const refreshTokenUsed = await KeyTokenService.findRefreshTokenUsed(refreshToken);
    if (refreshTokenUsed) {
      // Check user info has strange behavior
      const decodeToken = JWT.verify(refreshToken, refreshTokenUsed.privateKey);
      console.log(decodeToken);
      // Delete refreshToken
      await KeyTokenService.deleteTokenByUserId(decodeToken.userId);
      throw new ForbiddenError("Some thing went wrong, please re-login");
    }

    // 2.Check refreshToken available valid
    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) throw new UnauthenticatedError("User not register 1");
    console.log(holderToken);

    // 3.Check user available valid
    const { userId, userName, email } = JWT.verify(refreshToken, holderToken.privateKey);

    const foundUser = await findUserByEmail(email);
    if (!foundUser) throw new UnauthenticatedError("User not register 2");

    // 4.Create new tokens (AT vs RT)
    const tokens = await createTokenPair({ userId, userName, email }, holderToken.publicKey, holderToken.privateKey);

    // 5.Push refreshToken to "refreshTokenUsed"
    await holderToken.updateOne({
      $set: {
        refreshTokenUsing: tokens.refreshToken,
      },
      // Push refreshToken to "refreshTokenUsed"
      $addToSet: {
        // Token has been used to create new tokens(AT vs RT)
        refreshTokenUsed: refreshToken,
      },
    });

    console.log(holderToken);

    return {
      user: { userId, userName, email },
      tokens,
    };
  };

  static handlerRefreshTokenV2 = async ({ keyStore, user, refreshToken }) => {
    // ---------- Step By Step ----------
    // 1.Check token has been used or not
    // 2.Check refreshToken available valid
    // 3.Check user available valid
    // 4.Create new tokens
    // 5.Push refreshToken to "refreshTokenUsed"
    //

    // 1.Check token has been used or not
    const refreshTokenUsed = keyStore.refreshTokenUsed.includes(refreshToken);
    if (refreshTokenUsed) {
      await KeyTokenService.deleteTokenByUserId(user.userId);
      throw new ForbiddenError("Some thing went wrong, please re-login");
    }

    // 2.Check refreshToken available valid
    console.log(keyStore);
    if (keyStore.refreshTokenUsing !== refreshToken) throw new UnauthenticatedError("User not register 1");

    // 3.Check user available valid
    const { userId, userName, email } = user;
    const foundUser = await findUserByEmail(email);
    if (!foundUser) throw new UnauthenticatedError("User not register 2");

    // 4.Create new tokens (AT vs RT)
    const tokens = await createTokenPair({ userId, userName, email }, keyStore.publicKey, keyStore.privateKey);

    // 5.Push refreshToken to "refreshTokenUsed"
    await keyStore.updateOne({
      $set: {
        refreshTokenUsing: tokens.refreshToken,
      },
      // Push refreshToken to "refreshTokenUsed"
      $addToSet: {
        // Token has been used to create new tokens(AT vs RT)
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user: { userId, userName, email },
      tokens,
    };
  }; 

  static logout = async function name(keyStore) {
    const delKey = await KeyTokenService.deleteById(keyStore._id);
    return delKey;
  };

  static logIn = async function ({ email, password, refreshToken = null }) {
    // ---------- Step By Step ----------
    // 1.Check email
    // 2.Match Password
    // 3.Create AT & RT
    // 4.Generate token
    // 5.Create tokens (AT vs RT)

    // 1.ChecK Email
    const user = await findUserByEmail(email);

    if (!user) throw new NotFoundError("User dose not exist!!!");

    // 2.Match Password
    const isMatchingPassword = await bcrypt.compare(password, user.password);
    if (!isMatchingPassword) throw new BadRequestError("Password is not correct");

    // 3.Create AT & RT
    const { privateKey, publicKey } = createKeys();

    const { _id: userId, userName, role } = user;

    // 4.Generate token
    const tokens = await createTokenPair({ userId, userName, email, role }, publicKey, privateKey);

    // 5.Create tokens (AT vs RT)
    const storeTokens = await KeyTokenService.createKeyTokens({ userId, publicKey, privateKey, refreshTokenUsing: tokens.refreshToken });

    if (!storeTokens) throw new BadRequestError("Store Tokens Not Value!");

    return {
      user: getInfoData(user, ["_id", "fullName", "username", "email", "role"]),
      tokens,
    };
  };

  static signUp = async function ({ firstName, lastName, userName, email, password, role }) {
    // ---------- Step By Step ----------
    // 1.Create New User
    // 2.Create Publickey vs PrivateKey by Crypto
    // 3.Create tokens (AT vs RT)
    // 4.Return

    // 1.Create New User
    const newUser = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
    });

    // If user created successfully
    if (newUser) {
      // 2.Create Publickey vs PrivateKey by Crypto (Thuật toán bất đối xứng)
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });
      // console.log(privateKey, publicKey);
      // const publicKeyObject = crypto.createPublicKey(publicKey);
      // const privateKeyObject = crypto.createPublicKey(privateKey);
      // console.log(publicKeyObject, privateKeyObject);

      // 3.1 Create Publickey vs PrivateKey
      const { privateKey, publicKey } = createKeys();

      const { _id: userId, userName, email, role } = newUser;

      const keyStore = await KeyTokenService.createKeyTokens({ userId, publicKey, privateKey });

      if (!keyStore) throw new BadRequestError("KeyStore Error");

      // 3.Create tokens (AT vs RT)
      const tokens = await createTokenPair({ userId, userName, email, role }, publicKey, privateKey);

      // 4. Return
      return {
        user: getInfoData(newUser, ["firstName", "lastName", "userName", "email", "role"]),
        tokens,
      };
    }
  };
}

module.exports = UserService;
