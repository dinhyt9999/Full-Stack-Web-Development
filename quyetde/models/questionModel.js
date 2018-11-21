const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    content:{ type: String, require: true }
},{
    timestamps: true
});

module.exports = mongoose.model("Question", QuestionSchema);