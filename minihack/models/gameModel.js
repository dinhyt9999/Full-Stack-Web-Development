const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
	player1: { type: String, default:"" },
    player2: { type: String, default:"" },
    player3: { type: String, default:"" },
    player4: { type: String, default:"" },
    totalScore: { type: Array, default: [0,0,0,0]},
    roundScore: { type: Array, default: [{score1:0, score2:0, score3:0, score4:0}]} 
}, {
	timestamps: true
});

module.exports = mongoose.model("Question", GameSchema);