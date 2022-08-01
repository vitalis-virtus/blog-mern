const {model} = require("mongoose");
const { userSchema } = require("./schemas/index");

const User = model("User", userSchema);

module.exports = User;
