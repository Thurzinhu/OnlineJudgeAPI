const checkSubmissionResultData = (req, res, next) => {
  const { time, memory, token, status } = req.body;
  if (!time || !memory || !token || !status) {
    return res.status(403).json({ message: "Invalid submission result" });
  }
  next();
};

module.exports = { checkSubmissionResultData };
