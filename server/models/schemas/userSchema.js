const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User mmust have password"],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    token: {
      type: String,
      default: null
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = userSchema;
