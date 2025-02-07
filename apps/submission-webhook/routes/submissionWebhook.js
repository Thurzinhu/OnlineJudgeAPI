const express = require('express');
const router = express.Router();
const statusMapping = require('../../lib/config/statusMapping');
const { checkSubmissionResultData } = require('../middleware/verifySubmissionResultData');
const TestCaseDAO = require('../../lib/persistence/dao/TestCaseDAO');
const testCaseDAO = new TestCaseDAO();
const SubmissionDAO = require('../../lib/persistence/dao/SubmissionDAO');
const submissionDAO = new SubmissionDAO();

router.route('/')
    .put(
        checkSubmissionResultData,
        async (req, res) => {
            try {
                const { time, memory, token, status } = req.body;
                const testCaseData = {
                    time,
                    memory,
                    status: statusMapping[status.description]
                };
                const testCase = await testCaseDAO.updateByJudge0TrackingId(token, testCaseData);
                const submission = testCase.submission;
                const allTestCases = await testCaseDAO.getAllBySubmission(submission);
                const allTestCasesEvaluated = allTestCases.every(testCase => testCase.status !== 'Pending');
                if (allTestCasesEvaluated) {
                    await submissionDAO.update(submission, { status: getSubmissionStatus(allTestCases)});
                }
                res.sendStatus(200);
            } catch (err) {
                console.log(err.message);
                res.sendStatus(500);
            }
        });

const getSubmissionStatus = (testCases) => {
    return (testCases.every(testCase => testCase.status === 'AC')) ? 'Accepted' : 'Rejected';
}

module.exports = router;