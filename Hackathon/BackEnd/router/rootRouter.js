const express = require('express');
const path = require("path");

const RootRouter = express.Router();

RootRouter.use('./api/sing',SingRouter);
RootRouter.use('./api/background',BackgroundRouter);