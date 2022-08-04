const { Post } = require("../../models");

const cretePost = ({ username, title, text, imgUrl, author }) => {
  const newPostWithImage = new Post({ username, title, text, imgUrl, author });
  return newPostWithImage.save();
};

const getAll = () => {
  return Post.find();
};

const getPopular = () => {
  return Post.find().limit(5);
};

const getByIdAndIncreaseViews = (id) =>
  Post.findByIdAndUpdate(id, { $inc: { views: 1 } });

const deleteById = (id) => Post.findByIdAndDelete(id);

const getById = (id) => Post.findById(id);

module.exports = {
  cretePost,
  getAll,
  getPopular,
  getByIdAndIncreaseViews,
  deleteById,
  getById,
};
