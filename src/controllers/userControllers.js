const { userService } = require("../services");

const signup = async(req, res) => {
    try {
        const { name, login_id, password, email, phoneNumber, is_agree } = req.body;
        await userService.signup({
            name,
            login_id,
            password,
            email,
            phoneNumber,
            is_agree
        });
        return res.status(200).json({
            "message" : "SUCCESS"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
};

const login = async(req, res) => {
    try {
        const { login_id, password } = req.body;
        const token = await userService.login({login_id, password});
        return res.status(200).json({
            "message" : "SUCCESS",
            "accessToken" : token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const checkDuplicateUserID = async(req, res) => {
    try {
    const { login_id } = req.body;

    // 아이디 중복 확인
    const isDuplicate = await userService.checkDuplicateUserID(login_id);

        if (!isDuplicate) {
            // 아이디가 중복되지 않으면
            return res.status(200).json({
              message: "SUCCESS",
              message: "SUCCESS",
            });
          } else {
            // 아이디가 중복되면
            return res.status(400).json({
              message: "DUPLICATE_USERNAME",
              message: "DUPLICATE_USERNAME",
            });
          }
        } catch (error) {
          console.error(error);
          return res.status(400).json({
            message: "INTERNAL_SERVER_ERROR",
            message: "INTERNAL_SERVER_ERROR",
          });
        }
}

module.exports = {
    signup,
    login,
    checkDuplicateUserID
  };