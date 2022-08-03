const express = require("express");
const { checkAuth } = require("../middlewares");
const { posts: ctrl } = require("../controllers");

const postsRouter = express.Router();

//create post
postsRouter.get("/", checkAuth, ctrl.createPost);

module.exports = postsRouter;
