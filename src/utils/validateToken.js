const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const { throwError } = require("../utils/throwError");

const permitUrls = {
  "/products": "GET",
  "/products/:id": "GET",
  "/products/:id/reviews": "GET",
};

const permitCheck = (method, endPoint) => {
  endPoint = endPoint.split("?")[0];
  const pathIdx = endPoint.lastIndexOf("/") + 1;
  if (pathIdx === endPoint.length) endPoint = endPoint.slice(0, pathIdx - 1);

  const paths = endPoint.split("/");

  const parsePaths = paths.map((path) => {
    const parseIntPath = parseInt(path);
    return isNaN(parseIntPath) ? path : ":id";
  });

  const resultEndPoint = parsePaths.join("/");

  return permitUrls[resultEndPoint] === method;
};

// TODO 더 고민해보기
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
