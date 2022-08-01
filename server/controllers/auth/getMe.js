const { authService } = require("../../services");

// controller getMe user

const getMe = async (req, res, next) => {
  const { user } = req;
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        user,
      },
    });
  } catch (error) {}
};

module.exports = getMe;
