const { postsServices } = require("../../services");
const { authServices } = require("../../services");
const path = require("path");

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
    const post = await postsServices.deleteById(postId);

    if (!post) {
      res.json({
        message: "Such a post does not exist",
      });
    }

    await authServices.removePostById(userId, postId);

    req.json({
      post,
      message: "Post has been successfully deleted",
    });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};

module.exports = deletePost;
