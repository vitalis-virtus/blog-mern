const { Post } = require("../../models");

const cretePost = ({ username, title, text, imgUrl, author }) => {
  const newPostWithImage =  new Post({ username, title, text, imgUrl, author });
  return newPostWithImage.save()
};

module.exports = {
    cretePost
};
