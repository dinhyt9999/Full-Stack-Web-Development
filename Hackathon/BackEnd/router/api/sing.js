const express = require('express');
const path = require('path');
const singModel = require('../../model/singModel');

const SingRouter = express.Router();

SingRouter.post((req,res) => {
    const emotion = req.body.emotion;
    const genere = req.body.genere;
    singModel.find({emotion: emotion, genere:genere}, (err, singFound) => {
        if(err) console.log(err)
        else console.log("success");
        res.send({singFound});
    });
});
