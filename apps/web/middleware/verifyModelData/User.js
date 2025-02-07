const UserDAO = require('../../../lib/persistence/dao/UserDAO');
const userDAO = new UserDAO();

const checkUserData = async (req, res, next) => {
    const { firstName, lastName, email , password } = req.body;
    if (!firstName || !lastName || !email || !password)
    {
        return res.status(400).json({ message : 'Firstname, lastname, email and password are required'});
    }
    const isEmailBeingUsed = (await userDAO.getByEmail(email));
    if (isEmailBeingUsed)
    {
        return res.status(409).json({ message: 'There is alrealdy a user using this email' }); // conflict
    }
    next();
}

module.exports = { checkUserData };