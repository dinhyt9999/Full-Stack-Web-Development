const express = require('express');
const path = require("path");
const SongRouter = require("./api/song/song");
const BackgroundRouter = require("./api/background/background");

const RootRouter = express.Router();

RootRouter.use('./api/song',SongRouter);
RootRouter.use('./api/background',BackgroundRouter);
