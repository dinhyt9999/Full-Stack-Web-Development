const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SingSchema = new Schema({
    name: { type: String, required: true },
    singer: { type: String, required: true },
    emotion: { type: String, required: true },
    genere: { type: String, required: true },
    link: { type: String, required: true, unique: true}
},{
    timestamps: true
});

module.exports = mongoose.model("Sing", SingSchema);