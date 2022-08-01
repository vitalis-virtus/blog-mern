const express = require("express");
const { auth: ctrl } = require("../controllers");
const { jwtAuthenticate } = require("../middlewares");

const authRouter = express.Router();

authRouter.post("/register", ctrl.register);

authRouter.post("/login", ctrl.login);

authRouter.get("/me", jwtAuthenticate, ctrl.getMe);

module.exports = authRouter;
