const getFileContent = (file) => {
    return file.buffer.toString('utf-8');
};

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

module.exports = { getFileContent, fileIsValidMediaType };