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
    console.log(req.body);
    const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));
    console.log(typeof questions, questions.length);
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
    res.send(questions[questionrandom].content);
});

app.get("/question/:classname", (req,res) => {
    const id = req.params.classname;
    const questions = JSON.parse(fs.readFileSync('./questions.json',{encoding:'utf-8'}));
    res.send(questions[id].content);
});

app.get("/", (req,res) => {
    res.send("ahbchdgv");
})

app.listen(1447,(err) => {
    if(err) console.log(err)
    else console.log("server that");
})