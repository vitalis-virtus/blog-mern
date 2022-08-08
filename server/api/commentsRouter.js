const express = require("express");
const { comments: ctrl } = require("../controllers");
const { checkAuth } = require("../middlewares");

const commentsRouter = express.Router();

// create comment
// http://localhost:3002/api/comments/:id
commentsRouter.post("/:id", checkAuth, ctrl.createComment);

module.exports = commentsRouter;
