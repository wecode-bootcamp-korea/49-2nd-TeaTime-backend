const express = require("express");
const { cartController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const cartRouter = express.Router();

cartRouter.get("/show", validateToken, asyncWrap(cartController.showProductsAtcart));
cartRouter.get("/cartTotal", validateToken, asyncWrap(cartController.showCartProductTotal))
cartRouter.get("/showtotal", validateToken, asyncWrap(cartController.showTotalPriceAtcart));
cartRouter.post("/add", validateToken, asyncWrap(cartController.addProductAtCart));
cartRouter.delete("/del", validateToken, asyncWrap(cartController.delProductsAtcart));
cartRouter.post("/addcount", validateToken, asyncWrap(cartController.justaddCartCount));

module.exports = { cartRouter };
