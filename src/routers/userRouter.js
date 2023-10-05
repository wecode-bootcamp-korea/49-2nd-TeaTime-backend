const express = require("express");
const userController = require("../controllers/userControllers");
const userRouter = express.Router();
const { validateToken } = require("../utils/validateToken");

userRouter.post("/", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/check-duplicate-userid", userController.checkDuplicateUserID);
userRouter.post("/delivery", validateToken, userController.createDeliveryAddress);
userRouter.get("/userInfo", validateToken, userController.getUserRegistrationData);

module.exports = userRouter;