const SubmissionDAO = require('../persistence/dao/SubmissionDAO');
const submissionDAO = new SubmissionDAO();

const getAllSubmissions = async (req, res) => {
    const submissions = await submissionDAO.getAllByUser(req.userId);
    if (!submissions)
    {
        return res.status(204).json({ message: 'No submissions found.' });
    }
    res.json(submissions);
};

const getSubmissionById = async (req, res) => {
    const submissionFound = await submissionDAO.getById(req.params.id);
    if (!submissionFound)
    {
        return res.status(204).json({ message: `No problem submission ID ${req.params.id}.` });
    }
    res.json(submissionFound);
};

const createSubmission = async (req, res) => {
    const { problem, code, language } = req.body;
    if (!problem || !code || !language) {
        return res.status(400).json({ message: 'Problem, code, and language fields are required' });
    }
    try {
        const submissionData = {
            ...req.body,
            user: req.userId
        };
        const newSubmission = await submissionDAO.create(submissionData);
        res.status(201).json(newSubmission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSubmissions,
    getSubmissionById,
    createSubmission
}