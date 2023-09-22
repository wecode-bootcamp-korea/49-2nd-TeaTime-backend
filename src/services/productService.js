const { productDao, productQueryBuilder } = require("../models");

const findProducts = async (userId, category, sort, page) => {
  const categoryQuery = productQueryBuilder.categoryQuery(category);
  const sortQuery = productQueryBuilder.sortQuery(sort);

  const product = await productDao.findProducts(userId, categoryQuery, sortQuery, page);
  const countProducts = await productDao.countProducts(categoryQuery);

  return {
    product,
    dataCount: countProducts,
  };
};

module.exports = {
  findProducts,
};
