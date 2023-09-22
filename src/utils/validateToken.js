const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const { throwError } = require("../utils/throwError");

const permitUrls = [
  {
    method: "GET",
    endPoint: "/products",
  },
  {
    method: "GET",
    endPoint: "/products/",
  },
];

const permitCheck = async (method, endPoint) => {
  const pathParamIdx = endPoint.lastIndexOf("/") + 1;
  const num = endPoint.slice(pathParamIdx);
  if (!isNaN(parseInt(num))) endPoint = endPoint.slice(0, pathParamIdx);

  const isPermit = false;
  for (let permitUrl of permitUrls) {
    const equalMethod = permitUrl.method === method;
    const equalEndPoint = permitUrl.endPoint === endPoint;
    if (equalMethod && equalEndPoint) {
      isPermit = true;
      break;
    }
  }

  return isPermit;
};

const validateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;

    const isNotAccessToken = accessToken === "undefined" || !accessToken || accessToken === "null";

    if (isNotAccessToken && permitCheck(req.method, req.path)) return next();

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
