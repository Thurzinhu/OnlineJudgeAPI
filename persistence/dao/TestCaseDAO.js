const ITestCaseDAO = require('./ITestCaseDAO');
const TestCase = require('../models/TestCase');

class TestCaseDAO extends ITestCaseDAO {
    constructor() { super(); }

    async create(testCase) {
        const newTestCase = await TestCase.create(testCase);
        return newTestCase;
    }

    async update(id, fields) {

    }

    async delete(id) {
    }

    async getById(id) {
        const foundTestCase = await TestCase.findOne({ _id: id}); 
        return foundTestCase;
    }

    async getAll() {
    }
}

module.exports = TestCaseDAO;