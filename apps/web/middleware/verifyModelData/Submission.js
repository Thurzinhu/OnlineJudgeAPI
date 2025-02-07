const ProblemDAO = require('../../../lib/persistence/dao/ProblemDAO');
const problemDAO = new ProblemDAO();
const supportedLanguages = require('../../../lib/config/languages_list');

const checkSubmissionData = async (req, res, next) => {
    const { problem, code, language } = req.body;
    if (!problem || !code) {
        return res.status(400).json({ message: 'Problem, code, and language fields are required' });
    }
    if (!(language in supportedLanguages)) {
        return res.status(400).json({ message: 'Unsupported language. Allowed Languages: ' + Object.keys(supportedLanguages) });
    }
    if (!(await problemDAO.getById(problem))) {
        return res.status(400).json({ message: 'Problem not found'});
    }
    next();
}

module.exports = { checkSubmissionData };