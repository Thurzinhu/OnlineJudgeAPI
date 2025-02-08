const express = require('express');
const router = express.Router();
const statusMapping = require('../../lib/config/statusMapping');
const { checkSubmissionResultData } = require('../middleware/verifySubmissionResultData');
const TestCaseDAO = require('../../lib/persistence/dao/TestCaseDAO');
const testCaseDAO = new TestCaseDAO();
const SubmissionDAO = require('../../lib/persistence/dao/SubmissionDAO');
const submissionDAO = new SubmissionDAO();

async function updateTestCaseAndSubmission(token, testCaseData) {
    const testCase = await testCaseDAO.updateByJudge0TrackingId(token, testCaseData);
    const submissionId = testCase.submission;
    const pendingCount = await testCaseDAO.getPendingBySubmission(submissionId);
    if (pendingCount === 0) {
      const allTestCases = await testCaseDAO.getAllBySubmission(submissionId);
      const finalStatus = getSubmissionStatus(allTestCases);
      await submissionDAO.updateSubmissionStatus(submissionId, finalStatus);
    }
  }

router.route('/')
  .put(
    checkSubmissionResultData,
    async (req, res) => {
      try {
        const { time, memory, token, status } = req.body;
        const testCaseData = {
          time,
          memory,
          status: statusMapping[status.description] || 'Internal Error'
        };
        await updateTestCaseAndSubmission(token, testCaseData);
        res.sendStatus(200);
      } catch (err) {
        console.error('Webhook error:', err);
        res.sendStatus(500);
      }
    });

const getSubmissionStatus = (testCases) => {
    return (testCases.every(testCase => testCase.status === 'AC')) ? 'Accepted' : 'Rejected';
}

module.exports = router;