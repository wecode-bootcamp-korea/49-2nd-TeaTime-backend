const { reviewService } = require("../services");

const findReviewByProductId = async (req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  const productId = req.params.id;
  const { page = 1, image = 0 } = req.query;

  const reviews = await reviewService.findReviewByProductId(userId, productId, image, page);

  res.status(200).json({
    message: "READ_SUCCESS",
    data: reviews,
  });
};

module.exports = {
  findReviewByProductId,
};
