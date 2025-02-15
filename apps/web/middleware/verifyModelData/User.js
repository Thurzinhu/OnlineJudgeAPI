const UserDAO = require("../../../lib/persistence/dao/UserDAO");
const userDAO = new UserDAO();

const checkUserData = async (req, res, next) => {
  const { nickname, email, password } = req.body;
  if (!nickname || !email || !password) {
    return res
      .status(400)
      .json({
        message: "nickname, email and password are required",
      });
  }
  const isEmailBeingUsed = await userDAO.getByEmail(email);
  if (isEmailBeingUsed) {
    return res
      .status(409)
      .json({ message: "There is alrealdy a user using this email" }); // conflict
  }
  const isNicknameBeingUser = await userDAO.getByNickname(nickname);
  if (isNicknameBeingUser) {
    return res
      .status(409)
      .json({ message: "There is alrealdy a user using this nickname" }); // conflict
  }
  next();
};

module.exports = { checkUserData };
