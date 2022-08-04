const { postsServices } = require("../../services");
const path = require("path");

const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;

    const post = await postsServices.getById(id);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      req.files.image.mv(path.join(__dirname, "../..", "uploads", fileName));
      post.imgUrl = fileName;
    }

    post.title = title;
    post.text = text;

    await post.save();

    res.json({
      post,
      //   message: "Post has been updated",
    });
  } catch (error) {
    res.json({
      message: "Something wrong",
    });
  }
};

module.exports = updatePost;
