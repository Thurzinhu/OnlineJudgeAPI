const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    constraints: {
        type: String,
        required: true
    },
    inputFiles: {
        type: [String],
        required: true
    },
    outputFiles: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Problem', problemSchema);