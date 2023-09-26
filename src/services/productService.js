const { productDao, productQueryBuilder } = require("../models");
const { throwError } = require("../utils/throwError");

const findProducts = async (userId, category, sort, page) => {
  if (page < 1) throwError(400, "PAGE_STARTS_FROM_ONE");
  if (sort < 0) throwError(400, "SORT_STARTS_FROM_ZERO");

  const categoryQuery = productQueryBuilder.categoryQuery(category);
  const sortQuery = productQueryBuilder.sortQuery(sort);

  const products = await productDao.findProducts(userId, categoryQuery, sortQuery, page);
  const total = await productDao.countProducts(categoryQuery);

  return {
    products,
    total,
  };
};

// TODO 내용(content) 추가해야 하는지 물어보기
const findProductByIdWithOther = async (userId, productId) => {
  const product = await productDao.findProductById(productId);
  if (!product) throwError(404, "PRODUCT_NOT_FOUND");

  return await productDao.findProductByIdWithOther(userId, productId);
};

const findProductsBest = async (sort) => {
  if (sort < 0) throwError(400, "SORT_STARTS_FROM_ZERO");

  const sortQueryForBest = await productQueryBuilder.sortQueryForBest(sort);
  return await productDao.findProductsBest(sortQueryForBest);
};

module.exports = {
  findProducts,
  findProductByIdWithOther,
  findProductsBest,
};
