const { findById } = require("../services/apiKey.service");
const { ForbiddenError } = require("../core/error.response");
const HEADERS = {
  API_KEY: "x-api-key",
  PERMISSION_KEY: "x-permissions-key",
};

// Provide for customer one Api, if user login customer must be check API
const apiKey = async (req, res, next) => {
  // Check req.headers.x-api-key
  const apiKey = req.headers[HEADERS.API_KEY];
  if (!apiKey) throw new ForbiddenError("Forbidden Error 1");

  // Check objKey have exist
  const objKey = await findById(apiKey);
  if (!objKey) throw new ForbiddenError("Forbidden Error 2");

  req.objKey = objKey;
  next();
};

// Provide for customer one Api, if user login customer must be check API
const permission = (permission) => {
  return function (req, res, next) {
    if (!req.objKey.permissions) throw new ForbiddenError("Permission denied 1");
    // Check if permission belong to ["0000", "1111", "2222"]
    const validationPermission = req.objKey.permissions.includes(permission);
    console.log(req.objKey);
    if (!validationPermission) throw new ForbiddenError("Permission denied 2");
    return next();
  };
};

module.exports = { apiKey, permission };
