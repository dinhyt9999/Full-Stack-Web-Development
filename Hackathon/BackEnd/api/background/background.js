const express = require('express');
const path = require('path');
const backgroundModel = require('./backgroundModel');

const BackgroundRouter = express.Router();

BackgroundRouter.post("/",(req,res) => {
    const title = req.body.title;
    backgroundModel.find({title:title}).count({},(err,count) => {
        const randomNum = Math.floor(Math.random()*count)
        backgroundModel.findOne({title:title},null,{skip:randomNum},(err,backgroundFound) => {
            if(err) console.log(err)
            else res.send({backgroundFound});
        });
    });
});