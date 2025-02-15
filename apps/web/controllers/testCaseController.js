const TestCaseDAO = require("../../lib/persistence/dao/TestCaseDAO");
const testCaseDAO = new TestCaseDAO();

const getTestCaseById = async (req, res) => {
    try {
        const testCase = await testCaseDAO.getById(req.params.id);
        if (!testCase) {
          return res.status(204).json({ message: "No test case found." });
        }
        res.json(testCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTestCasesBySubmission = async (req, res) => {
    try {
        const testCases = await testCaseDAO.getAllBySubmission(req.params.id);
        res.json(testCases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTestCaseById,
    getAllTestCasesBySubmission
}