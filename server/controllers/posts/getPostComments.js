const { postsServices, commentsServices } = require("../../services");

const getPostComments = async (req, res) => {
  try {
    const post = await postsServices.getById(req.params.id);

    if (post.comments.length) {
      const list = await Promise.all(
        post.comments.map((comment) => {
          return commentsServices.findById(comment);
        })
      );
      res.json(
        list,
      );
    }
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};
module.exports = getPostComments;
