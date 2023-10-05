const {orderDao, cartDao, userDao} = require('../models');
const {throwError} = require("../utils/throwError");


const createOrder = async(
  totalPrice, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode,
  count, isBag, isPacking, productId
) => {
    const status = "결제완료";
    const payments = "kakaoPay";

    await orderDao.createOrder(
      payments,
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
      status,
      isBag,
      isPacking,
      productId
    );
};

const cartOrder = async(
  totalPrice, isShippingFee, isAgree, userId, name, phoneNumber, email,
  address, detailAddress, zipCode, cartIds
  ) => {
    const orders = await cartDao.findCartByIds(cartIds, userId);
    if(orders.length !== cartIds.length) {
      throwError(404, "USER_CART_MISMATCH")
    } 

    orders.forEach(order => {
      order.status = "결제완료";
    });
    const payments = "kakaoPay";

    let { point } = await userDao.findById(userId);

    point -= totalPrice;

    if(point < 0) {
      throwError(404, "NOT_ENOUGH_POINT")
    };

    await userDao.updatePoint(point, userId);

    await orderDao.cartOrder(
      payments,
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
      orders,
      cartIds
    );
};

const getOrderList = async(userId) => {
  const orderList = await orderDao.getOrderList(userId);

  return orderList;
};

const createGift = async(
  totalPrice, isShippingFee, isAgree, userId,
  count, isBag, isPacking, productId,
  giftName, giftPhoneNumber, content
) => {
  const payments = "kakaoPay";
  const status = "결제완료";

  const userInfo = await userDao.findById(userId);

  await orderDao.createGift(
    payments,
    totalPrice, 
    isShippingFee, 
    isAgree, 
    userId, 
    userInfo.name,
    userInfo.phone_number,
    userInfo.email,
    count, 
    isBag, 
    status,
    isPacking, 
    productId,
    giftName, 
    giftPhoneNumber, 
    content
  );
}

module.exports = {
  createOrder,
  getOrderList,
  cartOrder,
  createGift
};