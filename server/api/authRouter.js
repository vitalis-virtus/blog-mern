const express = require("express");
const { auth: ctrl } = require("../controllers");
const { checkAuth } = require("../middlewares");

const authRouter = express.Router();

// // http://localhost:3002/api/auth/register
authRouter.post("/register", ctrl.register);

// http://localhost:3002/api/auth/login
authRouter.post("/login", ctrl.login);

// http://localhost:3002/api/auth/me
authRouter.get("/me", checkAuth, ctrl.getMe);

module.exports = authRouter;
