const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const questionModel = require("./models/questionModel");

const questionRouter = require("./router/questionRouter");

const askRouter = require("./router/askRouter");

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

app.use("/ask",askRouter);

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

app.use("/question",questionRouter);

app.post("/answer",(req,res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    questionModel.findByIdAndUpdate(
        questionId, 
        { $inc : { [vote] : 1 } }, 
        {new: true},
        (err,questions) => {
            if (err) console.log(err)
            else console.log("update data success!");
            res.send({questions})
        });
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/view/home.html");
})

app.listen(1447,(err) => {
    if(err) console.log(err)
    else console.log("server that");
})