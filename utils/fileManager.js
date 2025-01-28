const path = require('path');

const getFileContent = (file) => {
    return file.buffer.toString('utf-8');
};

const getFileExtension = (file) => {
    return path.extname(file.originalname).toLowerCase();
}

const fileIsValidMediaType = (file, MIMETypes) => {
    for (let type of MIMETypes)
    {
        if (file.mimetype === type)
        {
            return true;
        }
    }
    return false;
};

module.exports = { 
    getFileExtension,
    getFileContent,
    fileIsValidMediaType
};