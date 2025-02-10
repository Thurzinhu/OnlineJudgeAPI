const UserDAO = require("../../lib/persistence/dao/UserDAO");
const userDAO = new UserDAO();

const getUserById = async (req, res) => {
  try {
    const user = await userDAO.getById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const user = await userDAO.update(req.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userDAO.getById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserById,
  updateCurrentUser,
  getCurrentUser,
};
