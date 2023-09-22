const { productService } = require("../services");

const findProducts = async (req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  const { page = 1, category = undefined, sort = 0 } = req.query;

  const products = await productService.findProducts(userId, page, category, sort);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: products,
  });
};

module.exports = {
  findProducts,
};
