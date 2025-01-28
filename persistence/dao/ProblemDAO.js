const IProblemDAO = require('./IProblemDAO');
const Problem = require('../models/Problem');
const TestCaseDAO = require('./TestCaseDAO');
const testCaseDAO = new TestCaseDAO();
const { getFileExtension, getFileContent } = require('../../utils/fileManager');

class ProblemDAO extends IProblemDAO {
    constructor() { super(); }

    async create(problem) {
        const problemData = await this.buildProblem(problem);
        const newProblem = await Problem.create(problemData);
        return newProblem;
    }

    async update(id, fields) {

    }

    async delete(id) {
        const foundProblem = await Problem.findByIdAndDelete(id);
        return foundProblem;
    }

    async getById(id) {
        const foundProblem = await Problem.findOne({ _id: id});
        return foundProblem;
    }

    async getAll() {
        const problems = await Problem.find();
        return problems;
    }
    
    async buildProblem(problem) {
        try {
            const testCases = await createTestCases(problem.testCases);
            const problemData = {
                ...problem,
                testCases
            };
            return problemData;
        } catch (err) {
            throw new Error(err.message);
        }
    };
}

const createTestCases = async (files) => {
    const inputFiles = files
        .filter(file => getFileExtension(file) === '.in')
    const testCases = [];
    for (const inputFile of inputFiles) {
        const outputFile = files.find(file => 
            file.originalname === inputFile.originalname.replace('.in', '.out')
        );
        try {
            const testCase = {
                input: getFileContent(inputFile),
                output: getFileContent(outputFile)
            }
            const newTestCase = await testCaseDAO.create(testCase);
            testCases.push(newTestCase._id);
        } catch (err) {
            throw new Error('Test cases could not be created');
        }
    }
    return testCases;
};

module.exports = ProblemDAO;