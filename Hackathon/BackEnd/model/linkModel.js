const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    link:{type: String, unique: true}
})

module.exports = mongoose.Schema("link",LinkSchema)