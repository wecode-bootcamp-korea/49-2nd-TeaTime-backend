const {orderDao} = require('../models');
const {throwError} = require("../utils/throwError");

const createOrder = async(
  payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode,
  count, status, isBag, isPacking, productId
) => {
    await orderDao.createOrder(
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
};

const cartOrder = async(
  payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode, orders
  ) => {
    await orderDao.cartOrder(
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
    );
};

const getOrderList = async(userId) => {
  const orderList = await orderDao.getOrderList(userId);
  console.log("service id", userId);
  console.log("service orderList", orderList);

  if(!orderList) throwError(404, "ORDERLIST_NOT_FOUND");
  
  if (!orderList || orderList.length === 0) {
    return [];
  }

  return orderList;
};

module.exports = {
  createOrder,
  getOrderList,
  cartOrder
};