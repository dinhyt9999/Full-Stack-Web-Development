const express = require("express");
const path = require("path");
const questionRouter = express.Router();

const questionModel = require("../models/questionModel");

questionRouter.get("/:questionId", (req,res) => {
    res.sendFile(path.resolve(__dirname,"../view/voteInfo.html"))
});
questionRouter.post("/:questionId", (req,res) => {
    let questionId = req.body.questionId;
    questionModel.findById(questionId,(err,question) => {
        res.send({question});
    })
});

module.exports = questionRouter;