const User = require('../../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstName, lastName, email , password } = req.body;
    if (!firstName || !lastName || !email || !password)
    {
        return res.status(400).json({ message : 'Firstname, lastname, email and password are required'});
    }

    if (await User.findOne({ email }).exec())
    {
        return res.status(409).json({ message: 'There is alrealdy a user using this email' }); // conflict
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({ success: `New user created!` });
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

module.exports = { handleNewUser };