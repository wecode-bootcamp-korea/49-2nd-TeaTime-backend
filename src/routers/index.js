const express = require("express");
const { productRouter } = require("./productRouter");
const { likeRouter } = require("./likeRouter");
const router = express.Router();

router.use("/products", productRouter);
router.use("/likes", likeRouter);

module.exports = router;
