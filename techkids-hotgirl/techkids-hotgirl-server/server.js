const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const RootRouter = require("./routers");

const app = express();

app.use(express.static("views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
    secret: "fuckyoubitch",
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        httpOnly: false,
        maxAge: 1000*60*60*24*7
    }
}))
//middle ware
app.use((req, res, next) => {
    console.log(req.sessionID);
    next();
});

const UserModel = require("./models/user");
app.get("/loginsuccess", (req, res, next) => {
	res.send("Login success!");
});
app.post("/login", (req,res) => {
    const { username, password } = req.body;
    if(username && password) {
        UserModel.findOne({username}, function(err,userFound){
            if (err) res.status(500).json({success:0, message: err})
            else if(!userFound || !userFound._id) res.status(404).json({ success: 0, message: "Not found!"})
            else {
                if(bcrypt.compareSync(password, userFound.password)){
                    const { username, email, _id} = userFound;
                    req.session.userInfo = {username, email, userId: _id};
                    res.json({success: 1, message: "login accepted"});
                } else res.status(401).json({success:0, message:"Wrong password"});
            }
        })
    }
})

app.delete("/logout",(req,res) => {
    req.session.destroy();
    res.json({success:1, message:"logout success!"});
})

mongoose.connect(
    "mongodb://localhost/techkids-hotgirl",
    {useNewUrlParser: true},
    (err) => {
        if(err) console.log(err)
        else console.log("DB connect success!");
    }
);

app.use("/", RootRouter);

app.listen(8728,(err) => {
    if(err) console.log(err)
    else console.log("server started!");
})