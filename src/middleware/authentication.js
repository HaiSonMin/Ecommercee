﻿const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const Authentication = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken || !accessToken.startsWith("Bearer ")) throw new UnauthenticatedError("Authentication invalid");

  const token = accessToken.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId, userName: payload.userName };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
module.exports = Authentication;
