const path = require("path");
const axios = require("axios");
const {
  getProblemFilesContent,
  getProblemFullBoilerplate,
} = require("./fileManager");
const ProblemDAO = require("../../lib/persistence/dao/ProblemDAO");
const problemDAO = new ProblemDAO();
const supportedLanguages = require("../../lib/config/languages_list");
const MOUNT_PATH =
  process.env.MOUNT_PATH ?? path.join(__dirname, "../apps/problems");
const JUDGE0_URI = process.env.JUDGE0_URI ?? "http://judge0:2358";
const JUDGE0_CALLBACK_URL =
  process.env.JUDGE0_CALLBACK_URL ?? "http://submission-webhook:4000";

const getProblemData = async (problemId) => {
  const problem = await problemDAO.getById(problemId);
  const testCasesPath = path.join(MOUNT_PATH, problem.slug, "tests");
  const inputsPath = path.join(testCasesPath, "inputs");
  const outputsPath = path.join(testCasesPath, "outputs");
  const fullboilerplatePath = path.join(
    MOUNT_PATH,
    problem.slug,
    "boilerplate-full",
    "function.js",
  );
  const inputs = await getProblemFilesContent(inputsPath);
  const outputs = await getProblemFilesContent(outputsPath);
  const fullBoilerplate = await getProblemFullBoilerplate(fullboilerplatePath);
  return {
    problem: problemId,
    inputs,
    outputs,
    fullBoilerplate,
  };
};

const handleJudgeSubmission = async (submission) => {
  const { language, code, problem } = submission;
  const problemData = await getProblemData(problem);
  problemData.userCode = problemData.fullBoilerplate.replace(
    "##USER_CODE_HERE##",
    code,
  );
  const response = await axios.post(`${JUDGE0_URI}/submissions/batch`, {
    submissions: problemData.inputs.map((input, index) => ({
      language_id: supportedLanguages[language],
      source_code: problemData.userCode,
      stdin: input,
      expected_output: problemData.outputs[index],
      callback_url: JUDGE0_CALLBACK_URL,
    })),
  });
  return response.data;
};

module.exports = {
  handleJudgeSubmission,
};
