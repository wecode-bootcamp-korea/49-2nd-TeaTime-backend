const express = require("express");
const { productRouter } = require("./productRouter");
const { likeRouter } = require("./likeRouter");
const { orderRouter } = require("./orderRouter");
const  userRouter  = require("./userRouter");
const { cartRouter } = require("./cartRouter")
const router = express.Router();

router.use("/products", productRouter);
router.use("/likes", likeRouter);
router.use("/user", userRouter);
router.use("/orders", orderRouter);
router.use("/cart", cartRouter)

module.exports = router;
