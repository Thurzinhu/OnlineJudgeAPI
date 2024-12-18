const User = require('../models/User');

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user)
        {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCurrentUser = async (req, res) => {
    try {
        const id = req.userId;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user)
        {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    req.params.id = req.userId;
    return getUserById(req, res);
};

module.exports = {
    getUserById,
    updateCurrentUser,
    getCurrentUser
};