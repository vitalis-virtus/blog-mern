const { authServices } = require("../../services");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// controller login user

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await authServices.findOneUser({ username });

    if (!user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "User with this userName is not exist",
      });
    }

    const correctPassword = user.comparePassword(password);

    if (!correctPassword) {
      return res.status(409).json({
        status: "error",
        code: 400,
        message: "Wrong password",
      });
    }

    const payload = {
      id: user._id,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

    await authServices.updateUserById(user._id, { token });

    res.status(200).json({
      status: "success",
      code: 200,
      token,
      user,
      message: "You enter the system",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
