const {orderDao, cartDao, userDao} = require('../models');
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
  address, detailAddress, zipCode, cartIds
  ) => {
    const orders = await cartDao.findCartByIds(cartIds, userId);
    if(orders.length !== cartIds.length) {
      throwError(404, "USER_CART_MISMATCH")
    } 

    orders.forEach(order => order.status = "결제완료");

    let { point } = await userDao.findById(userId);

    point -= totalFee;

    if(point < 0) {
      throwError(404, "NOT_ENOUGH_POINT")
    };

    await userDao.updatePoint(point, userId);

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
      orders,
      cartIds
    );
};

const getOrderList = async(userId) => {
  const orderList = await orderDao.getOrderList(userId);
  console.log("service id", userId);
  console.log("service orderList", orderList);

  return orderList;
};

module.exports = {
  createOrder,
  getOrderList,
  cartOrder,
};