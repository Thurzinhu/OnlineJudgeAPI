const UserDAO = require('../../persistence/dao/UserDAO');
const userDAO = new UserDAO();

const handleNewUser = async (req, res) => {
    try {
        await userDAO.create(req.body);
        res.status(201).json({ success: `New user created!` });
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

module.exports = { handleNewUser };