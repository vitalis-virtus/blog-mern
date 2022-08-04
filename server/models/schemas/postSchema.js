const { Schema } = require("mongoose");

const postSchema = Schema(
  {
    username: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }],
  },
  { versionKey: false, timestamps: true }
);

module.exports = postSchema;