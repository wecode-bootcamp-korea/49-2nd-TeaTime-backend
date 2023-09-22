const { throwError } = require("./throwError");

const keyCheck = (keysObject) => {
  Object.keys(keysObject).forEach((key) => {
    if (!keysObject[key]) throwError(400, `KEY_ERROR: ${key} required`);
  });
};

module.exports = { keyCheck };
