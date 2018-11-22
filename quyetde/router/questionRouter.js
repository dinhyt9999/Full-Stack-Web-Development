const express = require("express");
const questionRouter = express.Router();

const questionModel = require("../models/questionModel");

questionRouter.get("/:questionId", (req,res) => {
    questionModel.findById(req.params.questionId,(err,question) => {
        if(err) console.log(err)
        else
            res.json({ questions: question });
    });
});

module.exports = questionRouter;