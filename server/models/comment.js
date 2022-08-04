const { model } = require("mongoose");
const { commentSchema } = require("./schemas");

const Comment = model("Comment", commentSchema);

module.exports = Comment;
