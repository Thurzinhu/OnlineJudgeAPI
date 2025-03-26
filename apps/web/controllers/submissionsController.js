const SubmissionDAO = require("../../lib/persistence/dao/SubmissionDAO");
const submissionDAO = new SubmissionDAO();
const TestCaseDAO = require("../../lib/persistence/dao/TestCaseDAO");
const testCaseDAO = new TestCaseDAO();
const { handleJudgeSubmission } = require("../utils/judge0SubmissionHandler");

const getAllSubmissionsByProblem = async (req, res) => {
  try {
    const submissions = await submissionDAO.getAllByProblem(req.params.id);
    if (!submissions) {
      return res.status(204).json({ message: "No submissions found for this problem." });
    }
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSubmissionsByUser = async (req, res) => {
  try {
    const submissions = await submissionDAO.getAllByUser(req.userId);
    if (!submissions) {
      return res.status(204).json({ message: "No submissions found." });
    }
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubmissionById = async (req, res) => {
  try {
    const submissionFound = await submissionDAO.getById(req.params.id);
    if (!submissionFound) {
      return res
        .status(204)
        .json({ message: `No problem submission ID ${req.params.id}.` });
    }
    res.json(submissionFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubmission = async (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      user: req.userId,
    };
    const judge0TrackingIds = await handleJudgeSubmission(submissionData);
    const newSubmission = await submissionDAO.create(submissionData);
    const testCases = await Promise.all(
      judge0TrackingIds.map(async (judge0TrackingId) => {
        return testCaseDAO.create({
          submission: newSubmission._id,
          judge0TrackingId: judge0TrackingId.token,
        });
      }),
    );
    const testCaseIds = testCases.map((testCase) => testCase._id);
    const submission = await submissionDAO.update(newSubmission._id, {
      testCases: testCaseIds,
    });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSubmissionsByUser,
  getSubmissionById,
  createSubmission,
  getAllSubmissionsByProblem
};
