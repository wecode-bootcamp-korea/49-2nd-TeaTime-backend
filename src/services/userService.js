const { userDao } = require("../models");

const findUser = async (userId) => {
  return await userDao.findById(userId);
};

module.exports = {
  findUser,
};
