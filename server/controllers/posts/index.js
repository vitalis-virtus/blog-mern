const createPost = require("./createPost");
const getPosts = require("./getPosts");
const getPostById = require("./getPostById");
const getMyPosts = require("./getMyPosts");
const deletePost = require("./deletePost");
const updatePost = require("./updatePost");
const getPostComments = require('./getPostComments');

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getMyPosts,
  deletePost,
  updatePost,
  getPostComments
};
