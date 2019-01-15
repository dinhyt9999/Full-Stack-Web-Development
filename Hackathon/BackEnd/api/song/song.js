const express = require('express');
const path = require('path');
const singModel = require('../../model/singModel');

const SongRouter = express.Router();

SongRouter.post((req,res) => {
    const emotion = req.body.emotion;
    const genere = req.body.genere;
    songModel.find({emotion: emotion, genere:genere}, (err, songFound) => {
        if(err) console.log(err)
        else console.log("success");
        res.send({songFound});
    });
});
