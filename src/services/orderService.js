const {orderDao} = require('../models');
const {throwError} = require("../utils/throwError");

const createOrder = async(
  payments, totalFee, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode,
  count, status, isBag, isPacking, productId
) => {
    const order = await orderDao.createOrder(
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

    return{
      order
    };
};

const getOrderList = async(userId) => {
  const orderList = await orderDao.getOrderList(userId);
  console.log("service id", userId);
  console.log("service orderList", orderList);

  if(!orderList) throwError(404, "ORDERLIST_NOT_FOUND");

  return orderList;
};

module.exports = {
  createOrder,
  getOrderList
};