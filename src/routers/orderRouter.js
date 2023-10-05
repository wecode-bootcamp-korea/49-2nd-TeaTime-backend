const express = require('express');
const {orderController} = require('../controllers');
const { asyncWrap } = require('../utils/errorHandler');
const {validateToken} = require('../utils/validateToken');

const orderRouter = express.Router();

orderRouter.post('/', validateToken, asyncWrap(orderController.createOrder));
orderRouter.post('/carts', validateToken, asyncWrap(orderController.cartOrder));
orderRouter.post('/gift', validateToken, asyncWrap(orderController.createGift));
orderRouter.get("/", validateToken, asyncWrap(orderController.getOrderList));

module.exports = {orderRouter};