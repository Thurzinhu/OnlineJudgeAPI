const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
    {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser)
    {
        return res.sendStatus(403); // forbiddens
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email)
            {
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: foundUser._id,
                        role: foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken };