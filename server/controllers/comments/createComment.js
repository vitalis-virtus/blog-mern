const { commentsServices } = require("../../services");
const { postsServices } = require("../../services");

const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!comment) {
      res.json({
        message: "No comment",
      });
    }

    const newComment = await commentsServices.addComment(comment);

    try {
      await postsServices.getByIdAndUpdate(postId, newComment._id);
    } catch (error) {
      console.log(error);
    }
    res.json( newComment );
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};
module.exports = createComment;
