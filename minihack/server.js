const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const gameModel = require("./models/gameModel");
const app = express();

mongoose.connect(
	"mongodb://localhost/minihack",
	{ useNewUrlParser: true },

	(err) => {
		if(err) console.log(err)
		else console.log("DB connect success!");
	},
);

mongoose.set("useCreateIndex", true);

app.use(express.static("views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/addRound/:gameId",(req,res) => {
    let gameId = req.params.gameId;
    console.log(req.body);
    gameModel.updateOne(
        { _id:gameId },
        { 
            $push: {
                roundScore:{
                    $each:[{
                        score1:req.body.score1, 
                        score2:req.body.score2, 
                        score3:req.body.score3, 
                        score4:req.body.score4
                    }]
                }
            }
        }
    )
    res.send({message:"success"});
});

app.post("/", (req,res) => {
    gameModel.create({
        player1: req.body.player1,
        player2: req.body.player2,
        player3: req.body.player3,
        player4: req.body.player4
    },(err, gameCreated) => {
        if (err) console.log(err)
        else {
            res.send({dataRes: gameCreated})
        }
    })
});

app.get("/game/:gameId", (req,res) => {
    res.sendFile(__dirname + "/views/round.html");
});

app.get("/:gameId", (req,res) => {
    const gameId = req.params.gameId;
    gameModel.findById(gameId,(err,gameRes) => {
        if (err) console.log(err)
        else {
            res.send({gameRes});
        }
    })
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/name.html");
});

app.listen(8080,(err) => {
    if (err) console.log(err)
    else console.log("Server started!")
});
