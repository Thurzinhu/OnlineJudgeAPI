const UserDAO = require('../../../lib/persistence/dao/UserDAO');
const userDAO = new UserDAO();

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt)
    {
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    res.clearCookie(
        'jwt',
        {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        }
    );
    const foundUser = await userDAO.getByRefreshToken(refreshToken);
    if (!foundUser)
    {
        return res.sendStatus(204);
    }
    await userDAO.resetRefreshToken(foundUser._id);
    res.sendStatus(204);
}

module.exports = { handleLogout };