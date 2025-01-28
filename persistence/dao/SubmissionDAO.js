const ISubmissionDAO = require('./ISubmissionDAO');
const Submission = require('../models/Submission');
const ProblemDAO = require('./ProblemDAO');
const problemDAO = new ProblemDAO();
const evaluateSolution = require('../../utils/evaluateSolution');

class SubmissionDAO extends ISubmissionDAO {
    constructor() { super(); }

    async create(submission) {
        const { problem, code, language } = submission;
        const foundProblem = await problemDAO.getById(problem);
        const evaluationResult = await evaluateSolution(foundProblem, code, language);
        const newSubmission = {
            ...submission,
            evaluationResult
        };
        return newSubmission;
    }

    async update(id, fields) {

    }

    async delete(id) {
    }

    async getById(id) {
        const submissionFound = await Submission.findOne({ _id: id });
        return submissionFound;
    }

    async getAll() {
    }

    async getAllByUser(userId) {
        const submissions = await Submission.find({ user: userId });
        return submissions;
    }
}

module.exports = SubmissionDAO;