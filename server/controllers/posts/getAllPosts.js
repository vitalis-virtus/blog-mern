const { postsServices } = require("../../services");

const getAllPosts = async (req, res) => {
  const { page } = req.params;
  const limit = 5;

  try {
    const posts = await postsServices.getAll(page, limit).sort("-createdAt");

    const postsCount = await postsServices.getTotalCountOfPosts();

    const popularPosts = await postsServices.getPopular().sort("-views");

    if (!posts) {
      return res.json({ message: "No posts" });
    }

    res.json({
      posts,
      popularPosts,
      totalPages: postsCount,
    });
  } catch (error) {
    res.json({ message: "Something wrong" });
  }
};

module.exports = getAllPosts;
