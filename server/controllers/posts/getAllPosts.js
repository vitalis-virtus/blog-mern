const { postServices } = require("../../services");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postServices.getAll().sort("-createdAt");

    const popularPosts = await postServices.getPopular().sort("-views");

    if (!posts) {
      return res.json({ message: "No posts" });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: "Something wrong" });
  }
};

module.exports = getAllPosts;
