const { userDao } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const findUser = async (userId) => {
  return await userDao.findById(userId);
};

const signup = async(body) => {

  const { name, login_id, password, email, phoneNumber, is_agree } = body;

  const isAgreeValue = is_agree ? 1 : 0;

  if(!name || !login_id || !password || !email || !phoneNumber ){
    const error = new Error("KEY_ERROR");
    error.statusCode = 400
    error.code = "KEY_ERROR"
    throw error
    }

  const user = await userDao.getUserByEmail(email);

  // 이메일 정규화
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  if(!email.match(emailRegex)) {
    const error = new Error("DISABLE_EMAIL");
    error.statusCode = 400
    error.code = "DISABLE_EMAIL"
    throw error
    }

  //이메일 중복
  if(user.length != 0){
    const error = new Error("alreadyEmail");
    error.statusCode = 400
    error.code = "alreadyEmail"
    throw error
}

const userLogin = await userDao.getUserById(login_id);

  //아이디 영문,숫자로 4~12 이내 입력
const login_idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,12}$/;

  if (!login_id.match(login_idRegex)) {
      const error = new Error("INVALIDLOGIN_ID");
      error.statusCode = 400;
      error.code = "INVALIDLOGIN_ID";
      throw error;
  }

  //아이디 중복
  if(userLogin.length != 0){
    const error = new Error("ALREADYLOGIN_ID")
    error.statusCode = 400
    error.code = "ALREADYLOGIN_ID"
    throw error
}

  //비밀번호 8~16자 이내 영문 소문자/특수문자 포함
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/g;

  if(!password.match(passwordRegex)) {
      const error = new Error("PASSWORD INCORRECTLY")
      error.statusCode = 400
      error.code = "PASSWORD INCORRECTLY"
      throw error
  }

  //아이디,비밀번호 동일할때
  if (login_id === password) {
    const error = new Error("LOGIN_IDSAMEAAPASSWORD");
    error.statusCode = 400;
    error.code = "LOGIN_IDSAMEAAPASSWORD";
    throw error;
  }

const isValidPhoneNumber = await userDao.getUserByNumber(phoneNumber);

if (!isValidPhoneNumber) {
  const error = new Error("INVALID_PHONE_NUMBER");
  error.statusCode = 400;
  error.code = "INVALID_PHONE_NUMBER";
  throw error;
}

  const saltRounds = 10;

  const hashedPw = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.signupUser(
      name,
      login_id,
      hashedPw,
      email,
      phoneNumber,
      isAgreeValue
    );
    return createUser;
};

const checkDuplicateUserID = async(login_id) => {
const user = await userDao.getUserById(login_id);
return user.length !== 0;
}

const login = async(body) => {

const { login_id, password } = body;
   //id, pw KEY_ERROR 확인
   if(!login_id || !password ){
      const error = new Error("KEY_ERROR")
      error.statusCode = 400
      error.code = "KEY_ERROR"
      throw error
  }
  //if 유저 id 없으면 -> 없는 유저라고 출력
const user = await userDao.getUserById(login_id);

  if(!user || user.length === 0){
      const error = new Error("ERRORLOGIN_ID")
      error.statusCode = 400
      error.code = "ERRORLOGIN_ID"
      throw error
  }
  //찐 비번이랑 암호화 해서 DB에 있는 비번 비교
  const hashPw = await bcrypt.compare(password, user[0].password);

  //if flase라면 -> 없는 비번이라고 출력
  if(!hashPw){
      const error = new Error("PASSWORDERROR")
      error.statusCode = 400
      error.code = "PASSWORDERROR"
      throw error
  }
  //같으면 -> 정상 진행
  //payload로 전달할 내용인 해당 유저의 id값
  const userId = user[0].id;
  //payload를 id값으로, .env에 있는 secret key 가져옴
  const token = jwt.sign({"id" : userId }, process.env.SECRET_KEY)

  return token;
};

module.exports = {
  findUser,
  signup,
  checkDuplicateUserID,
  login
};
