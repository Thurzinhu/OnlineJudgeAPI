const path = require("path");
const fs = require("fs");

const getFileContent = (file) => {
  return file.buffer.toString("utf-8");
};

const getFileExtension = (file) => {
  return path.extname(file.originalname).toLowerCase();
};

const fileIsValidMediaType = (file, MIMETypes) => {
  for (let type of MIMETypes) {
    if (file.mimetype === type) {
      return true;
    }
  }
  return false;
};

const getProblemFilesContent = async (dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath);
    const fileContents = await Promise.all(
      files.map((file) => fs.promises.readFile(`${dirPath}/${file}`, "utf-8")),
    );
    return fileContents;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getProblemFullBoilerplate = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getFileExtension,
  getFileContent,
  fileIsValidMediaType,
  getProblemFilesContent,
  getProblemFullBoilerplate,
};
