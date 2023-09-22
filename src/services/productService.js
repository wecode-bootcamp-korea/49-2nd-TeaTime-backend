const { productDao } = require("../models");

const findProducts = async (userId, page, category, sort) => {
  const product = await productDao.findProducts(userId, page, category, sort);
  const countProducts = await productDao.countProducts(category);
  return {
    product,
    dataCount: countProducts,
  };
};

module.exports = {
  findProducts,
};
