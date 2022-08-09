const { postsServices } = require("../../services");

const getPosts = async (req, res) => {
  const limit = 5;
  
  try {
    const { page } = req.params;
    const posts = await postsServices.getPosts(page, limit).sort("-createdAt");

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

module.exports = getPosts;
