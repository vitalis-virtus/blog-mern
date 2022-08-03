const { authServices } = require("../../services");

// controller getMe user

const getMe = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await authServices.getUserById(userId);
    res.json({
      status: "success",
      code: 200,
      user,
      token: user.token,
    });
  } catch (error) {}
};

module.exports = getMe;
