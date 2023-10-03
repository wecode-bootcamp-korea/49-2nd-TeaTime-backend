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
  
  const orders = await orderService.createOrder(
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
    data : orders,
  });
};

const getOrderList = async(req, res) => {
  // const userId = req.headers.authorization;
  // console.log("id", userId)
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  console.log("controller userid : ", userId)
  const orderList = await orderService.getOrderList(userId);
  console.log("list", orderList)

  res.status(200).json({
    message : "READ_LIST_SUCCESS",
    data : orderList,
  });
};

module.exports = {
  createOrder,
  getOrderList
};