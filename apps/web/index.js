require("dotenv").config();
require("../lib/config/googleAuth");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const connectDb = require("../lib/config/dbConnection");
const setupSwagger = require("./utils/swagger");
const PORT = process.env.PORT || 3500;

connectDb();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/problems", require("./routes/problems"));
app.use("/api/submissions", require("./routes/submissions"));
app.use("/api/default_code", require("./routes/defaultCode"));
app.use("/api/test_case", require("./routes/testCase"));

setupSwagger(app);

mongoose.connection.once("open", () => {
  console.log("Connected to db");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
