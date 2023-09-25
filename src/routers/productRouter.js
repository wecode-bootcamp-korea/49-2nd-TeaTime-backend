const express = require("express");
const { productController, reviewController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const productRouter = express.Router();

productRouter.get("/", validateToken, asyncWrap(productController.findProducts));
productRouter.get("/:id", validateToken, asyncWrap(productController.findProductByIdWithOther));
productRouter.get("/:id/reviews", validateToken, asyncWrap(reviewController.findReviewByProductId));
// TODO 위클리 베스트 API 구현하기

module.exports = { productRouter };
