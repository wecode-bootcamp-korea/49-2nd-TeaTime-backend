const express = require("express");
const { likeController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const likeRouter = express.Router();

likeRouter.post("/", validateToken, asyncWrap(likeController.pushLike));

module.exports = { likeRouter };
