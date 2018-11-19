const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("view"));
app.get("/ask", (req,res) => {
    res.sendFile(__dirname + "/view/ask.html");
});

app.post("/ask", (req,res) => {
    const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));
    let newQuestion = {
        id: questions.length,
        yes: 0,
        no: 0,
        content: req.body.question
    }    
    questions.push(newQuestion);
    fs.writeFileSync('./questions.json',JSON.stringify(questions));
    res.redirect("/");
});

app.get("/randomquestion", (req,res) => {
    const questions = JSON.parse(fs.readFileSync('./questions.json',{encoding:'utf-8'}));
    let questionrandom = Math.floor(Math.random()*questions.length);
    res.json({questions: questions[questionrandom]});
});

app.get("/question/:questionId", (req,res) => {
    const questions = JSON.parse(fs.readFileSync('./questions.json',{encoding:'utf-8'}));
    res.json({questions: questions[req.params.questionId]});
});

app.post("/answer",(req,res) => {
    const questionId = req.body.questionId;
    const vote = req.body.vote;
    const questions = JSON.parse(fs.readFileSync('./questions.json','utf-8'));
    if(vote == "yes") questions[questionId].yes++
    else questions[questionId].no++;
    fs.writeFileSync('./questions.json',JSON.stringify(questions));
    res.redirect("http://localhost:1447/question/"+questionId);
});
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/view/home.html");
})

app.listen(1447,(err) => {
    if(err) console.log(err)
    else console.log("server that");
})