const { postsServices } = require("../../services");

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsServices.getByIdAndIncreaseViews(id);
    res.json({ post });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};

module.exports = getPostById;
