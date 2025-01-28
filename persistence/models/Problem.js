const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TestCase = require('./TestCase');

// title, description, timeLimit, memoryLimit, functionName, functionParams, testCases

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeLimit: {
        type: Number,
        default: 2000 // milliseconds
    },
    memoryLimit: {
        type: Number,
        default: 128 // MB
    },
    functionName: {
        type: String,
        required: true
    },
    functionParams: {
        type: [String]
    },
    testCases: [{
        type: Schema.Types.ObjectId,
        ref: 'TestCase',
        required: true
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Problem', problemSchema);