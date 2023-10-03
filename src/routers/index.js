const express = require("express");
const { productRouter } = require("./productRouter");
const { likeRouter } = require("./likeRouter");
const { orderRouter } = require("./orderRouter");
const  userRouter  = require("./userRouter");
const router = express.Router();

router.use("/products", productRouter);
router.use("/likes", likeRouter);
router.use("/user", userRouter);
router.use("/orders", orderRouter);

module.exports = router;
