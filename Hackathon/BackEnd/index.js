const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const RootRouter = require("./rootRouter");

const app = express();

app.use(cors());

mongoose.connect('mongodb://admin:admin123@ds163650.mlab.com:63650/listmusicbymood', 
    { useNewUrlParser: true },
    (err) => {
        if (err) console.log(err)
        else console.log("DB Connected");
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/", RootRouter);

const port = process.env.port || 4146;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("Server is started")
});