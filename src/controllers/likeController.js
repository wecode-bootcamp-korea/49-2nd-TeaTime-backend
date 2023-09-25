const { likeService } = require("../services");

const pushLike = async (req, res) => {
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  const productId = req.body.productId;

  await likeService.pushLike(userId, productId);

  res.status(200).json({ message: "LIKE_PUSHED" });
};

module.exports = {
  pushLike,
};
