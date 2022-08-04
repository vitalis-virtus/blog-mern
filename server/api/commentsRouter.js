const express = require("express");
const { comments: ctrl } = require("../controllers");
const { checkAuth } = require("../middlewares");

const commentsRouter = express.Router();

// create comment
commentsRouter.post("/:id", checkAuth, ctrl.createComment);

module.exports = commentsRouter;
