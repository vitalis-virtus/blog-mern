const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileUpload");

const { authRouter } = require("./api");
const { postsRouter } = require("./api");
const commentRouter = require("./api/commentsRouter");
const app = express();

require("dotenv").config();

//constants
const { PORT = 3002, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

//routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentRouter);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fxnfm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
