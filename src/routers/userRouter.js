const express = require("express");
const userController = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.post("/check-duplicate-userid", userController.checkDuplicateUserID);

module.exports = userRouter;