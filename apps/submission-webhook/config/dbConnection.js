const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;