// list of verified roles to hit an endpoint
// check if current user has some role in allowedRoles
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.userRole)
        {
            return res.sendStatus(401);
        }
        const roles = [...allowedRoles];
        const result = req.userRole
            .map(role => roles.includes(role))
            .find(val => val === true);
        if (!result)
        {
            return res.sendStatus(401);
        }
        next();
    };
};

module.exports = verifyRoles;