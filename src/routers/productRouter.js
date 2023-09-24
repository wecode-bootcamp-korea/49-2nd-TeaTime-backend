const express = require("express");
const { productController } = require("../controllers");
const { asyncWrap } = require("../utils/errorHandler");
const { validateToken } = require("../utils/validateToken");
const productRouter = express.Router();

productRouter.get("/", validateToken, asyncWrap(productController.findProducts));
productRouter.get("/:id", validateToken, asyncWrap(productController.findProductByIdWithOther));

module.exports = { productRouter };
