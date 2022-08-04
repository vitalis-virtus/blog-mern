const { Comment } = require("../../models");

const addComment = (comment) => {
  const newComment = new Comment({ comment });
  return newComment.save();
};

const findById = (id) => {
  return Comment.findById(id);
};

module.exports = { addComment, findById };
