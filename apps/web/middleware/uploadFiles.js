const multer = require("multer");
const storage = multer.memoryStorage();
const {
  fileIsValidMediaType,
  getFileExtension,
} = require("../utils/fileManager");
const MAX_TEST_CASES_COUNT = 40;

function fileFilter(req, file, cb) {
  if (file.fieldname == "testCases") {
    const extension = getFileExtension(file);
    if (
      !fileIsValidMediaType(file, ["text/plain", "application/octet-stream"]) ||
      (extension !== ".in" && extension !== ".out")
    ) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  } else {
    if (
      !fileIsValidMediaType(file, ["application/javascript", "text/javascript"])
    ) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  }
}

const testCases = {
  name: "testCases",
  maxCount: MAX_TEST_CASES_COUNT,
};

const uploadTestCaseFiles = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
  fileFilter: fileFilter,
}).fields([testCases]);

module.exports = { uploadTestCaseFiles };
