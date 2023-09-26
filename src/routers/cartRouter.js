const express = require("express");
const { cartController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const cartRouter = express.Router();

cartRouter.get("/", validateToken, asyncWrap(cartController.cartProducts));
cartRouter.get("/:id", validateToken, asyncWrap(cartController.cartProducts));

module.exports = { cartRouter };