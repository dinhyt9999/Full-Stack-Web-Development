const express = require("express");
const path = require("path");

const askRouter = express.Router();

const questionModel = require("../models/questionModel");

askRouter.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../view/ask.html'));
});

askRouter.post("/", (req, res) => {
    questionModel.create({content: req.body.question}, (err, questionCreated) => {
        if(err) console.log(err)
        else 
            res.redirect("/");
    });
});

module.exports = askRouter;