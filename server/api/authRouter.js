const express = require("express");
const { auth: ctrl } = require("../controllers");
const { checkAuth } = require("../middlewares");

const authRouter = express.Router();

authRouter.post("/register", ctrl.register);

authRouter.post("/login", ctrl.login);

authRouter.get("/me", checkAuth, ctrl.getMe);

module.exports = authRouter;
