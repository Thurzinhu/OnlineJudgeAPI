const supportedLanguages = require('../../config/languages_list');

const checkSubmissionData = (req, res, next) => {
    const { problem, code, language } = req.body;
    if (!problem || !code) {
        return res.status(400).json({ message: 'Problem, code, and language fields are required' });
    }
    if (!(language in supportedLanguages)) {
        return res.status(400).json({ message: 'Unsupported language. Allowed Languages: ' + Object.keys(supportedLanguages) });
    }
    next();
}

module.exports = { checkSubmissionData };