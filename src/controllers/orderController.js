const {orderService} = require('../services');

const createOrder = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  console.log("order Id" , userId);

  const {
    payments,
    totalFee, 
    isShippingFee, 
    isAgree,
    name, 
    phoneNumber,
    email,
    address, 
    detailAddress,
    zipCode,
    count,
    status,
    isBag,
    isPacking,
    productId
  } = req.body;

  console.log(req.body);
  
  await orderService.createOrder(
    payments, 
    totalFee, 
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
    status,
    isBag,
    isPacking,
    productId
  );

  res.status(200).json({
    message: "ORDER_SUCCESS",
  });
};

const cartOrder = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  const {
    payments, 
    totalFee, 
    isShippingFee, 
    isAgree,
    name, 
    phoneNumber, 
    email,
    address, 
    detailAddress, 
    zipCode, 
    orders
  } = req.body;

  await orderService.cartOrder(
    payments, 
    totalFee, 
    isShippingFee, 
    isAgree,
    userId,
    name, 
    phoneNumber, 
    email,
    address, 
    detailAddress, 
    zipCode, 
    orders
  )
};

const getOrderList = async(req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;

  console.log("controller userid : ", userId)
  const orderList = await orderService.getOrderList(userId);
  console.log("list", orderList)

  res.status(200).json({
    message : "READ_LIST_SUCCESS",
  });
};

module.exports = {
  createOrder,
  getOrderList,
  cartOrder
};