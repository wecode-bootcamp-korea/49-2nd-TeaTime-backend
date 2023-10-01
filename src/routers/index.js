const express = require("express");
const { productRouter } = require("./productRouter");
const { likeRouter } = require("./likeRouter");
const  userRouter  = require("./userRouter");
const router = express.Router();

router.use("/products", productRouter);
router.use("/likes", likeRouter);
router.use("/user", userRouter);

module.exports = router;
