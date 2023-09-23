const { productService } = require("../services");

const findProducts = async (req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  const { page = 1, category = undefined, sort = 0 } = req.query;

  const products = await productService.findProducts(userId, category, sort, page);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: products,
  });
};

const findProductByIdWithOther = async (req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  const productId = req.params.id;

  const product = await productService.findProductByIdWithOther(userId, productId);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: product,
  });
};

module.exports = {
  findProducts,
  findProductByIdWithOther,
};
