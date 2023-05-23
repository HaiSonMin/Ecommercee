const JWT = require("jsonwebtoken");
const KeyTokenService = require("../services/keyToken.service");
const { UnauthenticatedError, NotFoundError, BadRequestError } = require("../core/error.response");
const createKeys = require("../utils/createKey");

const HEADERS = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-key",
  PERMISSION_KEY: "x-permissions-key",
  REFRESH_TOKEN: "x-rtoken-id",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  // Create access token
  const accessToken = JWT.sign(payload, publicKey, { expiresIn: "2 days", algorithm: "HS256" });

  // Create refresh token
  const refreshToken = JWT.sign(payload, privateKey, { expiresIn: "7 days", algorithm: "HS256" });

  // Verify access token => payload has verify
  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) console.log(`Error verify::: ${err}`);
    else console.log(`Decode verify::: ${JSON.stringify(decode)}`);
  });

  return { accessToken, refreshToken };
};

const authentication = async (req, res, next) => {
  /**
   * 1. Check userId missing
   * 2. Get refreshToken
   * 3. VerifyToken
   * 4. Check User in DB
   * 5. Check keyStore with this userId
   * 6. return Next()
   */

  //  1. Check userId missing
  const userId = req.headers[HEADERS.CLIENT_ID];
  if (!userId) throw new UnauthenticatedError("Invalid request");

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found KeyStore");

  // Only work for RT
  if (req.headers[HEADERS.REFRESH_TOKEN]) {
    try {
      const decodeUser = JWT.verify(req.headers[HEADERS.REFRESH_TOKEN], keyStore.privateKey);
      console.log(decodeUser);
      if (userId !== decodeUser.userId) throw new UnauthenticatedError("Invalid userId");
      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = req.headers[HEADERS.REFRESH_TOKEN];
      return next();
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  const accessToken = await req.headers.authorization;
  if (!accessToken) throw new UnauthenticatedError("Invalid request");

  try {
    //  3. VerifyToken
    //  4. Check User in DB
    const decode = JWT.verify(accessToken, keyStore.publicKey);
    console.log(decode);
    if (userId !== decode.userId) throw new UnauthenticatedError("Invalid userId");
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

module.exports = { createTokenPair, authentication };
