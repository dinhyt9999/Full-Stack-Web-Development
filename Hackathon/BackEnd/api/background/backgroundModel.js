const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BackGroundSchema = new Schema({
    title: {type: String},
    image : {type: Buffer, required: true, unique: true}
})

module.exports = mongoose.model("backGround", BackGroundSchema);
 