const { productDao, productQueryBuilder } = require("../models");
const { throwError } = require("../utils/throwError");

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

// TODO 내용(content) 추가해야 하는지 물어보기
const findProductByIdWithOther = async (userId, productId) => {
  const product = await productDao.findProductById(productId);

  if (!product) throwError(404, "CONTENT_NOT_FOUND");

  return await productDao.findProductByIdWithOther(userId, productId);
};

module.exports = {
  findProducts,
  findProductByIdWithOther,
};
