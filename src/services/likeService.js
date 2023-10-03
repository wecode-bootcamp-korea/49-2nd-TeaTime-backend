const { likeDao, productDao } = require("../models");
const { throwError } = require("../utils/throwError");

const pushLike = async (userId, productId) => {
  const product = await productDao.findProductById(productId);
  if (!product) throwError(404, "PRODUCT_NOT_FOUND");

  const like = await likeDao.findByIds(userId, productId);
  if (like) {
    await likeDao.deleteByIds(userId, productId);
  } else {
    await likeDao.save(userId, productId);
  }
};

module.exports = { pushLike };
