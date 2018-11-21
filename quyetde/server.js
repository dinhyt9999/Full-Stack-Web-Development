const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

const questionModel = require("./models/questionModel");

mongoose.connect(
    "mongodb://localhost/quyetde", 
    { useNewUrlParser: true },
    (err) => {
        if(err) console.log(err)
        else console.log("DB connect success!");
    }
);

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("view"));

app.get("/ask", (req,res) => {
    res.sendFile(__dirname + "/view/ask.html");
});

app.post("/ask", (req,res) => {
    questionModel.create({content: req.body.question}, (err, questionCreated) => {
        if(err) console.log(err)
        else 
            res.redirect("/");
    });
});

app.get("/randomquestion", (req,res) => {
    questionModel.count({},(err,count) => {
        if(err) console.log(err)
        else {
            const randomNum = Math.floor(Math.random()*count);
            questionModel.findOne({},null,{skip: randomNum},(err,questionFound) => {
                if(err) console.log(err)
                else res.json({ questions: questionFound });
            });
        };
    });
}); 

app.get("/question/:questionId", (req,res) => {
    questionModel.findById(req.params.questionId,(err,question) => {
        if(err) console.log(err)
        else
            res.json({ questions: question });
    });
});

app.post("/answer",(req,res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    var voteNo = 0;
    var voteYes = 0;
    questionModel.findById(questionId,(err,question) => {
        if (vote == "yes") {
            voteYes = question.yes + 1;
            voteNo = question.no;
        }
        else {
            voteNo = question.no + 1;
            voteYes = question.yes;
        };
        questionModel.updateOne(
            {_id: questionId},
            {$set:{
                yes: voteYes,
                no: voteNo,
            }},
            (err,raw) => {
                if(err) console.log(err)
                else {
                    console.log("update data success!");
                }; 
            }
        );
    });
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/view/home.html");
})

app.listen(1447,(err) => {
    if(err) console.log(err)
    else console.log("server that");
})