const { userService } = require("../services");

const signup = async (req, res) => {
  try {
    const { name, loginId, password, email, phoneNumber, isAgree } = req.body;
    await userService.signup({
      name,
      loginId,
      password,
      email,
      phoneNumber,
      isAgree,
    });
    return res.status(201).json({
      message: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const token = await userService.login({ loginId, password });
    return res.status(200).json({
      message: "SUCCESS",
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const checkDuplicateUserID = async (req, res) => {
  try {
    const { loginId } = req.body;
    await userService.checkDuplicateUserID({ loginId });
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const createDeliveryAddress = async (req, res) => {
  try {
    const { address, detailAddress, zipCode, name, isMain, phoneNumber, subName } = req.body;
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;
    await userService.createDeliveryAddress({address, detailAddress, zipCode, name, isMain, userId, phoneNumber, subName});
    return res.status(200).json({ 
      message: 'DELIVERY ADDRESS SUCCESS' 
    });
  } catch (error) {
    console.log(error); 
    return res.status(400).json(error);
  }
};

const getUserRegistrationData = async (req, res) => {
  try {
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;
    const userData = await userService.getUserRegistrationData(userId);
    return res.status(200).json({ 
      message: 'SUCCESS',
      user: userData
    });
  } catch (error) {
    console.log(error); 
    return res.status(400).json(error);
  }
};

const updateDeliveryAddress = async (req, res) => {
  try {
    const { address, detailAddress, zipCode, name, isMain, phoneNumber, subName } = req.body;
    const foundUser = req.foundUser;
    const userId = foundUser ? foundUser.id : undefined;

    await userService.updateDeliveryAddress(addressId, {
      address,
      detailAddress,
      zipCode,
      name,
      isMain,
      userId,
      phoneNumber,
      subName,
    });
    return res.status(200).json({ 
      message: 'SUCCESS',
    });
  } catch (error) {
    console.log(error); 
    return res.status(400).json(error);
  }
};

const deleteDeliveryAddress = async (req, res) => {
  try{
  const { addressId } = req.body;
  await userService.deleteDeliveryAddress(addressId);
  return res.status(200).json({ 
    message: 'SUCCESS',
    user: userData
  });
} catch (error) {
  console.log(error); 
  return res.status(400).json(error);
}}

module.exports = {
  signup,
  login,
  checkDuplicateUserID,
  createDeliveryAddress,
  getUserRegistrationData,
  updateDeliveryAddress,
  deleteDeliveryAddress
};