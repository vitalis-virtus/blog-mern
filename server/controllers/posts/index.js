const createPost = require("./createPost");
const getAllPosts = require("./getAllPosts");
const getPostById = require("./getPostById");
const getMyPosts = require("./getMyPosts");
const deletePost = require("./deletePost");
const updatePost = require("./updatePost");
const getPostComments = require('./getPostComments');

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  deletePost,
  updatePost,
  getPostComments
};
