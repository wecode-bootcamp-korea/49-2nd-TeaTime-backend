const express = require("express");
const { cartController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const cartRouter = express.Router();

cartRouter.get("/cart/add", validateToken, asyncWrap(cartController.showProductsAtcart));
cartRouter.get("/cart/del", validateToken, asyncWrap(cartController.showTotalPriceAtcart));
cartRouter.post("/cart/show", validateToken, asyncWrap(cartController.addProductAtCart));
cartRouter.delete("/cart/total", validateToken, asyncWrap(cartController.delProductsAtcart));

module.exports = { cartRouter };

// router는 경로설정만
// ex) 수정은 post put 삭제는 del 확인은 get