const express = require("express");
const { checkAuth } = require("../middlewares");
const { posts: ctrl } = require("../controllers");

const postsRouter = express.Router();

// create post
// http://localhost:3002/api/posts/
postsRouter.post("/", checkAuth, ctrl.createPost);

// get all posts
// http://localhost:3002/api/posts/
postsRouter.get("/:page", ctrl.getAllPosts);

// get post by id
// http://localhost:3002/api/posts/post/:id
postsRouter.get("/post/:id", ctrl.getPostById);

// get my posts
// http://localhost:3002/api/posts/user/me
postsRouter.get("/user/me", checkAuth, ctrl.getMyPosts);

// delete post
// http://localhost:3002/api/posts/:id
postsRouter.delete("/:id", checkAuth, ctrl.deletePost);

// update post
// http://localhost:3002/api/posts/id
postsRouter.put("/:id", checkAuth, ctrl.updatePost);

// get post comments
// http://localhost:3002/api/posts/comments/:id
postsRouter.get("/comments/:id", ctrl.getPostComments);

module.exports = postsRouter;
