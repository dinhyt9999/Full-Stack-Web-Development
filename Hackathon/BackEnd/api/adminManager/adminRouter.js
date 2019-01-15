const express = require('express');
const path = require('path');
const SongModel = require('../song/songModel')
const AdminRouter = express.Router();

AdminRouter.post("/login",(req,res) => {
    const user = req.body.user;
    const pass = req.body.pass;

});

AdminRouter.get("/",(req,res) => {
    
});

AdminRouter.post("/post",(req,res) => {
    const newPost = req.body;
    SongModel.create(newPost, (err, postCreated) => {
        if (err) res.status(500).json({
            success: 0,
            message: err
        })
        else res.status(201).json({
            success: 1,
            message: postCreated
        });
    });
})

AdminRouter.delete("/:id",(req,res) => {
    const id = req.params.id;
    SongModel.findByIdAndDelete(id,(err,res) => {
        if(err) console.log(err)
        else res.send({message: "deleted"}); 
    });
});

