const {orderService} = require('../services');
const {keyCheck} = require('../utils/keyCheck');

const createOrder = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  const {
    totalPrice, 
    isShippingFee, 
    isAgree,
    name, 
    phoneNumber,
    email,
    address, 
    detailAddress,
    zipCode,
    count,
    isBag,
    isPacking,
    productId
  } = req.body;

  keyCheck({
    totalPrice, 
    isShippingFee, 
    isAgree,
    name, 
    phoneNumber,
    email,
    address, 
    detailAddress,
    zipCode,
    count,
    isBag,
    isPacking,
    productId
  });
  
  const result = await orderService.createOrder(
    totalPrice, 
    isShippingFee, 
    isAgree,
    userId,
    name,
    phoneNumber,
    email,
    address, 
    detailAddress, 
    zipCode,
    count,
    isBag,
    isPacking,
    productId
  );

  res.status(200).json({
    message: "ORDER_SUCCESS",
    data : result
  });
};

const cartOrder = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  const {
    totalPrice, 
    isShippingFee, 
    isAgree,
    name, 
    phoneNumber, 
    email,
    address, 
    detailAddress, 
    zipCode, 
    cartIds
  } = req.body;

  keyCheck({
    totalPrice, 
    isShippingFee, 
    isAgree,
    name, 
    phoneNumber, 
    email,
    address, 
    detailAddress, 
    zipCode, 
    cartIds
  });

  const result = await orderService.cartOrder(
    totalPrice, 
    isShippingFee, 
    isAgree,
    userId,
    name, 
    phoneNumber, 
    email,
    address, 
    detailAddress, 
    zipCode, 
    cartIds
  );

  res.status(200).json({
    message : "ORDER_SUCCESS",
    data : result
  });
};

const getOrderList = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  const orderList = await orderService.getOrderList(userId);

  res.status(200).json({
    message : "READ_LIST_SUCCESS",
    data : orderList
  });
};

const createGift = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  const {
    totalPrice, 
    isShippingFee, 
    isAgree, 
    count, 
    isBag, 
    isPacking, 
    productId,
    giftName, 
    giftPhoneNumber, 
    content
  } = req.body;

  const result = await orderService.createGift(
    totalPrice, 
    isShippingFee, 
    isAgree, 
    userId,
    count, 
    isBag, 
    isPacking, 
    productId,
    giftName, 
    giftPhoneNumber, 
    content
  );

  res.status(200).json({
    message : "GIFT_SUCCESS",
    data : result
  });
};

module.exports = {
  createOrder,
  getOrderList,
  cartOrder,
  createGift
};