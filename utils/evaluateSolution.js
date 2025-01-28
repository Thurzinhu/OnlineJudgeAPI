const ivm = require('isolated-vm');
const TestCaseDAO = require('../persistence/dao/TestCaseDAO');
const testCaseDAO = new TestCaseDAO();

const TLE_MESSAGE = 'Script execution timed out.';

// title, description, timeLimit, memoryLimit, functionName, functionParams, testCases
const evaluateSolution = async (problem, userCode) => {
    const { memoryLimit, timeLimit, functionName, testCases } = problem;
    const virtualMachine = new ivm.Isolate({
        memoryLimit: parseInt(memoryLimit, 10),
        onCatastrophicError: (err) => {
            console.error(err);
            console.log('CatastrophicError');
            process.abort();
        }
    });
    const context = await virtualMachine.createContext();
    const jail = context.global;
    await jail.set('global', jail.derefInto());
    const status = {
        AC: 0,
        WA: 0,
        TLE: 0
    };
    const runTest = async (testCase) => {
        try {
            const script = await virtualMachine.compileScript(
                addWrapper(userCode, functionName, testCase)
            );
            const result = await script.run(context, { timeout: timeLimit });
            if (JSON.stringify(result) === testCase.output) {
                status.AC++;
            } else {
                status.WA++;
            }
            script.release();
        } catch (err) {
            if (err.message === TLE_MESSAGE) status.TLE++;
            else throw new Error(err.message);
        }
    };
    for (const testCaseId of testCases) {
        const testCase = await testCaseDAO.getById(testCaseId);
        try {
            await runTest(testCase);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    context.release();
    virtualMachine.dispose();
    return status;
};

const addWrapper = (userCode, functionName, testCase) => {
    const input = JSON.stringify(JSON.parse(testCase.input));
    return `
        ${userCode}
        ${functionName}.apply(null, ${input});
    `;
};

module.exports = evaluateSolution;