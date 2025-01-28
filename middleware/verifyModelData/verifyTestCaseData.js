// check if test case files were sent
// and if each .in file has a correpondent .out file
function checkTestCaseFiles(req, res, next) {
    const uploadedFiles = req.files?.testCases;
    if (!uploadedFiles)
    {
        return res.status(400).json({ message: 'Test cases are required' });
    }
    const inFiles = uploadedFiles
        .filter(file => file.originalname.endsWith('.in'))
        .map(file => file.originalname);
    const outFiles = uploadedFiles
        .filter(file => file.originalname.endsWith('.out'))
        .map(file => file.originalname);
    const missingOutFiles = inFiles
    .filter(file => {
        return !outFiles.includes(file.replace('.in', '.out'));
    });
    const missingInFiles = outFiles
    .filter(file => {
        return !inFiles.includes(file.replace('.out', '.in'))
    });
    if (missingOutFiles.length > 0) {
        return res.status(400).json({
            error: 'Missing corresponding .out files for .in files',
            missingFiles: missingOutFiles
        });
    }
    if (missingInFiles.length > 0) {
        return res.status(400).json({
            error: 'Missing corresponding .in files for .out files',
            missingFiles: missingInFiles
        });
    }
    next();
}

module.exports = { checkTestCaseFiles };