const { productDao, productQueryBuilder } = require("../models");
const { throwError } = require("../utils/throwError");

const findProducts = async (userId, category, sort, page) => {
  if (page < 1) throwError(400, "PAGE_STARTS_FROM_ONE");
  if (sort < 0) throwError(400, "SORT_STARTS_FROM_ZERO");

  const categoryQuery = productQueryBuilder.categoryQuery(category);
  const sortQuery = productQueryBuilder.sortQuery(sort);

  const products = await productDao.findProducts(userId, categoryQuery, sortQuery, page);
  const total = await productDao.countProducts(categoryQuery);
  const totalConvertInt = +total;

  // 쿼리문에서 형변환이 잘 안됨
  products.forEach((product) => {
    if (product.discountPrice) product.discountPrice = +product.discountPrice;
    product.likeCount = +product.likeCount;
    product.reviewCount = +product.reviewCount;
  });

  return {
    products,
    total: totalConvertInt,
  };
};

// TODO 내용(content) 추가해야 하는지 물어보기
const findProductByIdWithOther = async (userId, productId) => {
  const product = await productDao.findProductById(productId);
  if (!product) throwError(404, "PRODUCT_NOT_FOUND");

  const productByIdWithOther = await productDao.findProductByIdWithOther(userId, productId);
  // 쿼리문에서 형변환이 잘 안됨
  if (productByIdWithOther.discountPrice) productByIdWithOther.discountPrice = +productByIdWithOther.discountPrice;
  productByIdWithOther.isLiked = +productByIdWithOther.isLiked;
  productByIdWithOther.reviewCount = +productByIdWithOther.reviewCount;
  productByIdWithOther.reviewGradeAvg = +productByIdWithOther.reviewGradeAvg;

  return productByIdWithOther;
};

const findProductsBest = async (sort) => {
  if (sort < 0) throwError(400, "SORT_STARTS_FROM_ZERO");

  const sortQueryForBest = await productQueryBuilder.sortQueryForBest(sort);
  const products = await productDao.findProductsBest(sortQueryForBest);

  // 쿼리문에서 형변환이 잘 안됨
  products.forEach((product) => {
    if (product.discountPrice) product.discountPrice = +product.discountPrice;
  });

  return products;
};

module.exports = {
  findProducts,
  findProductByIdWithOther,
  findProductsBest,
};
