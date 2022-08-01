const { authServices } = require("../../services");

// controller register user
const register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const isUsed = await authServices.findOneUser({ username });

    if (isUsed) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "User with this userName is already registered",
      });
    }

    await authServices.addUser({ username, password });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success registered",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = register;
