const ISubmissionDAO = require('./interfaces/ISubmissionDAO');
const Submission = require('../models/Submission');

class SubmissionDAO extends ISubmissionDAO {
    constructor() { super(); }

    async create(submission) {
        const newSubmission = await Submission.create(submission);
        return newSubmission;
    }

    async update(id, fields) {
        const submission = await this.getById(id);
        if (!submission) {
            throw new Error('Submission not found');
        }
        Object.assign(submission, fields);
        await submission.save();
        return submission;
    }

    // await submissions.updateOne(
    //     { 
    //         _id: submissionId,  // Match correct submission
    //         status: 'Pending',  // Prevent multiple updates
    //         $expr: { 
    //             $not: { 
    //                 $in: ['Pending', await testCases.distinct('status', { submission: submissionId })]
    //             }
    //         }
    //     },
    //     { $set: { status: getSubmissionStatus(testCases) } }  // Atomic update
    // );

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