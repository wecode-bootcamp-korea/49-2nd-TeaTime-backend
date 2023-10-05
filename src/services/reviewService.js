const { reviewDao, productDao, reviewQueryBuilder } = require("../models");
const { throwError } = require("../utils/throwError");

const findReviewByProductId = async (userId, productId, image, page) => {
  if (page < 1) throwError(400, "PAGE_STARTS_FROM_ONE");
  if (image < 0) throwError(400, "IMAGE_STARTS_FROM_ZERO");

  const product = await productDao.findProductById(productId);
  if (!product) throwError(404, "PRODUCT_NOT_FOUND");

  const whereQuery = reviewQueryBuilder.whereQuery(image);

  const reviews = await reviewDao.findReviewByProductId(userId, productId, whereQuery, page);
  const total = await reviewDao.countReviews(productId, whereQuery);

  return {
    reviews,
    total,
  };
};

module.exports = {
  findReviewByProductId,
};
