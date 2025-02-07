const ITestCaseDAO = require('./interfaces/ITestCaseDAO');
const TestCase = require('../models/TestCase');

class TestCaseDAO extends ITestCaseDAO {
    constructor() { super(); }

    async create(testCase) {
        const newTestCase = await TestCase.create(testCase);
        return newTestCase;
    }

    async update(id, fields) {

    }

    async updateByJudge0TrackingId(judge0TrackingId, fields) {
        const foundTestCase = await TestCase.findOne({ judge0TrackingId: judge0TrackingId  });
        if (!foundTestCase) {
            throw new Error('Test case not found');
        }
        Object.assign(foundTestCase, fields);
        foundTestCase.save();
        return foundTestCase;
    }

    async delete(id) {
    }

    async getById(id) {
        const foundTestCase = await TestCase.findOne({ _id: id}); 
        return foundTestCase;
    }

    async getAll() {
    }

    async getAllBySubmission(submission) {
        const testCases = await TestCase.find({ submission: submission });
        return testCases;
    }
}

module.exports = TestCaseDAO;