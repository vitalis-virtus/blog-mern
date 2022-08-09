const { postsServices } = require("../../services");
const { authServices } = require("../../services");

const getMyPosts = async (req, res) => {
  const limit = 5;

  try {
    const { page = 1 } = req.params;

    const user = await authServices.getUserById(req.userId);

    const postsSlice = user.posts
      .reverse()
      .slice((page - 1) * limit, page * limit);

    const list = await Promise.all(
      postsSlice.map((post) => postsServices.getById(post._id))
    );

    res.json({ list, totalPages: user.posts.length });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};

module.exports = getMyPosts;
