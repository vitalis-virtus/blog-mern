const { authServices } = require("../../services");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// controller register user
const register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const isUsed = await authServices.findOneUser({ username });

    if (isUsed) {
      return res.json({
        message: "User with this userName is already registered",
      });
    }

    const newUser = await authServices.addUser({ username, password });

    const payload = {
      id: newUser._id,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

    const userWithToken = await authServices.updateUserById(newUser._id, {
      token,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      user: userWithToken,
      token,
      message: "Success registered",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = register;
