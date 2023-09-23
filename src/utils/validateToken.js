const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const { throwError } = require("../utils/throwError");

const permitCheck = (method, endPoint) => {
  const permitUrls = {
    "/products": "GET",
    "/products/": "GET",
  };

  const pathParamIdx = endPoint.lastIndexOf("/") + 1;
  const num = parseInt(endPoint.slice(pathParamIdx));

  if (pathParamIdx === endPoint.length) endPoint = endPoint.slice(0, pathParamIdx - 1);

  if (!isNaN(num)) endPoint = endPoint.slice(0, pathParamIdx);

  return permitUrls[endPoint] === method;
};

const validateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    const isNotAccessToken = accessToken === "undefined" || !accessToken || accessToken === "null";

    if (isNotAccessToken && permitCheck(req.method, req.originalUrl)) return next();
    if (isNotAccessToken) throwError(401, "ACCESS_TOKEN_REQUIRED");

    const { id } = jwt.verify(accessToken, process.env.SECRET_KEY);

    const foundUser = await userService.findUser(id);
    if (!foundUser) throwError(404, "USER_NOT_FOUND");

    req.foundUser = foundUser;
    next();
  } catch (error) {
    error.status = error.status || 400;
    error.message = error.message.toUpperCase().replaceAll(" ", "_");
    next(error);
  }
};

module.exports = { validateToken };
