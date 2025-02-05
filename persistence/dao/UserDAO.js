const IUserDAO = require('./interfaces/IUserDAO');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserDAO extends IUserDAO {
    constructor() { super(); }

    async create(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await User.create({
            ...user,
            password: hashedPassword
        });
        return newUser;
    }
    
    async update(id, fields) {
        const { password, ...fieldsToUpdate } = fields;
        const user = await this.getById(id);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, fieldsToUpdate);
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        return user;
    }
    
    async delete(id) {
    }
    
    async getById(id) {
        const user = await User.findById(id);
        return user;
    }

    async getByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async getByRefreshToken(refreshToken) {
        const user = User.findOne({ refreshToken });
        return user;
    }

    async saveRefreshToken(id, refreshToken) {
        const user = await User.findByIdAndUpdate(
            id,
            { refreshToken },
            { new: true }
        );
        return user;
    }

    async resetRefreshToken(id) {
        const user = await User.findByIdAndUpdate(
            id,
            { refreshToken: '' },
            { new: true }
        );
        return user;
    }

    async getAll() {
    }
}

module.exports = UserDAO;