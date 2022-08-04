const { Schema } = require("mongoose");

const commentSchema = Schema(
  {
    comment: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = commentSchema;
