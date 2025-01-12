const multer = require('multer');
const storage = multer.memoryStorage();
const { fileIsValidMediaType } = require('../utils/fileManager');

function fileFilter(req, file, cb) {
    if (file.fieldname == 'inputFiles')
    {
        if (!fileIsValidMediaType(file, ['text/plain']))
        {
            cb(null, false);
        }
        else
        {
            cb(null, true);
        }
    }
    else
    {
        if (!fileIsValidMediaType(file, ['application/javascript', 'text/javascript']))
        {
            cb(null, false);
        }
        else
        {
            cb(null, true);
        }
    }
};

const inputFiles = {
    name: 'inputFiles',
    maxCount: 40,
}

const solutionFile = {
    name: 'solutionFile', 
    maxCount: 1, 
};

const uploadInputAndSolutionFiles = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2 MB 
    },
    fileFilter: fileFilter
}).fields([
    inputFiles, solutionFile
]);

module.exports = { uploadInputAndSolutionFiles };