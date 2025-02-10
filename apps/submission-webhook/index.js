require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("../lib/config/dbConnection");
const mongoose = require("mongoose");
const PORT = 4000;

connectDb();

app.use(express.json());

app.use("/", require("./routes/submissionWebhook"));

mongoose.connection.once("open", () => {
  console.log("Submission webhook connect to db");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
