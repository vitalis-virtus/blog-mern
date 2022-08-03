const { postServices } = require("../../services");
const { authServices } = require("../../services");

const getMyPosts = async (req, res) => {
  try {
    const user = await authServices.getUserById(req.userId);

    const list = await Promise.all(
      user.posts.reverse().map((post) => postServices.getById(post._id))
    );

    res.json({ list });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};

module.exports = getMyPosts;
