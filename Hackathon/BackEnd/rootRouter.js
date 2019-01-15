const express = require('express');
const path = require("path");

const RootRouter = express.Router();

RootRouter.use('./api/song/song.js',SingRouter);
RootRouter.use('./api/background/background.js',BackgroundRouter);