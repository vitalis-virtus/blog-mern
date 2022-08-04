const { postsServices } = require("../../services");
const { authServices } = require("../../services");
const path = require("path");

const createPost = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const user = await authServices.getUserById(req.userId);

    // we have image in req.body
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      req.files.image.mv(path.join(__dirname, "../..", "uploads", fileName));

      const newPostWithImage = await postsServices.cretePost({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await authServices.updateUserById(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    // no image in req.body
    const newPostWithoutImage = await postsServices.cretePost({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });

    await authServices.updateUserById(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    return res.json(newPostWithoutImage);
  } catch (error) {
res.json({
  message: "Something wrong"
})  }
};

module.exports = createPost;
