const { model } = require("mongoose");
const { postSchema } = require("./schemas");

const Post = model("Post", postSchema);

module.exports = Post;
