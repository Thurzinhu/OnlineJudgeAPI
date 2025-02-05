const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
    submission: {
        type: Schema.Types.ObjectId,
        ref: 'Submission',
        required: true
    },
    status: {
        type: String,
        enum: ['AC', 'WA', 'RE', 'CE', 'TLE', 'Pending'],
        default: 'Pending'
    },
    time: {
        type: Number,
        required: false
    },
    memory: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('TestCase', testCaseSchema);