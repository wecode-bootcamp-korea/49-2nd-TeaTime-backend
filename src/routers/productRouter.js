const express = require("express");
const { productController, reviewController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const productRouter = express.Router();

productRouter.get("/", validateToken, asyncWrap(productController.findProducts));
productRouter.get("/best", asyncWrap(productController.findProductsBest));
productRouter.get("/:id", validateToken, asyncWrap(productController.findProductByIdWithOther));
productRouter.get("/:id/reviews", validateToken, asyncWrap(reviewController.findReviewByProductId));
productRouter.get("/order/:id", asyncWrap(productController.findProductByIdForOrder));

module.exports = { productRouter };
