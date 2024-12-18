require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConnection');
const PORT = process.env.PORT || 3500;

connectDb();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/submissions', require('./routes/submissions'));

mongoose.connection.once('open', () => {
    console.log('Connected to db');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});