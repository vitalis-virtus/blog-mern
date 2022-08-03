const { User } = require("../../models");

const findOneUser = (filter) => User.findOne(filter);

const addUser = ({ username, password }) => {
  const newUser = new User({ username });
  newUser.setPassword(password);
  return newUser.save();
};

const updateUserById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, { new: true });
};

const getUserById = (id) => User.findById(id);

module.exports = {
  findOneUser,
  addUser,
  updateUserById,
  getUserById
};
