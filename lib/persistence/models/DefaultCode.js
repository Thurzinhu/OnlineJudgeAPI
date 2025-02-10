const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultCodeSchema = new Schema({
  boilerplate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "js",
  },
  problem: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DefaultCode", defaultCodeSchema);
