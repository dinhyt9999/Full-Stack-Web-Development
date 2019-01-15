const express = require('express');
const path = require('path');
const LinkModel = require('./linkModel');

const LinkRouter = express.Router();

LinkRouter.post('/',(req,res) => {
    LinkModel.create({link: req.body.link}, (err, linkCreated) => {
        if(err) console.log(err)
        else res.send({message: "success"});
    })
})