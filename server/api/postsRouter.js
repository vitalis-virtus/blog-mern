const express = require("express");
const { checkAuth } = require("../middlewares");
const { posts: ctrl } = require("../controllers");

const postsRouter = express.Router();

// create post
postsRouter.post("/", checkAuth, ctrl.createPost);

// get all posts
postsRouter.get("/", ctrl.getAllPosts);

// get post by id
postsRouter.get("/:id", ctrl.getPostById);

// get my posts
postsRouter.get("/user/me", checkAuth, ctrl.getMyPosts);

module.exports = postsRouter;
