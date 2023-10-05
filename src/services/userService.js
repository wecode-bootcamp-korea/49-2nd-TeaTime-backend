const { userDao } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwError } = require("../utils/throwError");

require("dotenv").config();

const findUser = async (userId) => {
  return await userDao.findById(userId);
};

const signup = async (body) => {
  const { name, loginId, password, email, phoneNumber, isAgree } = body;

  const isAgreeValue = isAgree ? 1 : 0;

  //email, name, password가 다 입력되지 않은 경우
  if (!name || !loginId || !password || !email || !phoneNumber) {
    throwError(400, "KEY_ERROR");
  }

  const user = await userDao.getUserByEmail(email);

  // 이메일 정규화
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  if (!email.match(emailRegex)) {
    throwError(400, "DISABLE_EMAIL");
  }

  //이메일 중복
  if (user.length != 0) {
    throwError(400, "ALREADYEMAIL");
  }

  const userLogin = await userDao.getUserById(loginId);

  //아이디 영문,숫자로 4~12 이내 입력
  const login_idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,12}$/;

  if (!loginId.match(login_idRegex)) {
    throwError(400, "INVALIDLOGIN_ID");
  }

  //아이디 중복
  if (userLogin.length != 0) {
    throwError(400, "ALREADYLOGIN_ID");
  }

  //비밀번호 8~16자 이내 영문 소문자/특수문자 포함
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/g;

  if (!password.match(passwordRegex)) {
    throwError(400, "PASSWORD INCORRECTLY");
  }

  //아이디,비밀번호 동일할때
  if (loginId === password) {
    throwError(400, "LOGIN_IDSAMEAAPASSWORD");
  }

  const isValidPhoneNumber = await userDao.getUserByNumber(phoneNumber);

  if (!isValidPhoneNumber) {
    throwError(400, "INVALID_PHONE_NUMBER");
  }

  const saltRounds = 10;

  const hashedPw = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.signupUser(name, loginId, hashedPw, email, phoneNumber, isAgreeValue);
  return createUser;
};

const checkDuplicateUserID = async (body) => {
  const { loginId } = body;

  // 아이디 중복 확인
  const isDuplicate = await userDao.getUserById(loginId);

  if (isDuplicate.length !== 0) {
    throwError(400, "DUPLICATE_USERNAME");
  }
  return isDuplicate;
};

const login = async (body) => {
  const { loginId, password } = body;
  //id, pw KEY_ERROR 확인
  if (!loginId || !password) {
    throwError(400, "KEY_ERROR");
  }
  //if 유저 id 없으면 -> 없는 유저라고 출력
  const user = await userDao.getUserById(loginId);

  if (!user || user.length === 0) {
    throwError(400, "ERRORLOGIN_ID");
  }
  //찐 비번이랑 암호화 해서 DB에 있는 비번 비교
  const hashPw = await bcrypt.compare(password, user[0].password);

  //if flase라면 -> 없는 비번이라고 출력
  if (!hashPw) {
    throwError(400, "PASSWORDERROR");
  }
  //같으면 -> 정상 진행
  //payload로 전달할 내용인 해당 유저의 id값
  const userId = user[0].id;
  //payload를 id값으로, .env에 있는 secret key 가져옴
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY);

  return token;
};

const createDeliveryAddress = async (body) => {
  const { address, detailAddress, zipCode, name, isMain, userId, phoneNumber, subName } = body;

  const isMainValue = isMain ? 1 : 0;

  if (!address || !detailAddress || !zipCode || !name || isMain === undefined || !userId || !phoneNumber || !subName ) {
    throwError(400, "KEY_ERROR");
}

const user = await userDao.findById(userId);
if (!user) {
  throwError(404, "USER_NOT_FOUND");
}

if (isMain) {
  await userDao.clearMainDeliveryAddress(userId);
}
  await userDao.createDeliveryAddress(address, detailAddress, zipCode, name, isMainValue, userId, phoneNumber, subName);
};

const getUserRegistrationData = async (userId) => {
  if (!userId) {
    throwError(400, "KEY_ERROR");
  }

  const userData = await userDao.getMainDeliveryAddress(userId);
  const user = await userDao.findById(userId);

  return {
    userDatadeliveryAddressData: userData,
    userRegistrationData: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phone_number
  }
};
};

const updateDeliveryAddress = async (body,addressId) => {
  const { address, detailAddress, zipCode, name, isMain, phoneNumber, subName } = body;

  const isMainValue = isMain ? 1 : 0;

  if (!address || !detailAddress || !zipCode || !name || !userId || !phoneNumber || !subName ) {
    throwError(400, "KEY_ERROR");
 }

 const existingAddress = await userDao.getDeliveryAddressById(addressId);

  if (!existingAddress) {
    throwError(404, "ADDRESS_NOT_FOUND");
  }

  await userDao.updateDeliveryAddress(addressId, address, detailAddress, zipCode, name, isMainValue, phoneNumber, subName);
};

const deleteDeliveryAddress = async (addressId) => {
  if (!addressId) {
    throwError(400, "KEY_ERROR");
  }

  const existingAddress = await userDao.getDeliveryAddressById(addressId);

  if (!existingAddress) {
    throwError(404, "ADDRESS_NOT_FOUND");
  }

  await userDao.deleteDeliveryAddress(deliveryAddressId);
};

module.exports = {
  findUser,
  signup,
  checkDuplicateUserID,
  login,
  createDeliveryAddress,
  getUserRegistrationData,
  updateDeliveryAddress,
  deleteDeliveryAddress
};
