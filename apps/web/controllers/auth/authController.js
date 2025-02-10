const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserDAO = require("../../../lib/persistence/dao/UserDAO");
const userDAO = new UserDAO();

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const foundUser = await userDAO.getByEmail(email);
  if (!foundUser) {
    return res
      .status(401)
      .json({ message: "There is no user with this email" });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );
    await userDAO.saveRefreshToken(foundUser._id, refreshToken);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

module.exports = { handleLogin };
