const checkProblemData = (req, res, next) => {
    const { title, description, functionName } = req.body;
    if (!title || !description || !functionName)
    {
        return res.status(400).json({ message: 'Title, description, function name are required' });
    }
    next();
};

module.exports = { checkProblemData };