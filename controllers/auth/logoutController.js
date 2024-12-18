const User = require('../../models/User');

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
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser)
    {
        return res.sendStatus(204);
    }
    foundUser.refreshToken = '';
    await foundUser.save();
    res.sendStatus(204);
}

module.exports = { handleLogout };