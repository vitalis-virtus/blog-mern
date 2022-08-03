const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { authRouter } = require("./api");
const { postsRouter } = require("./api");
const app = express();

require("dotenv").config();

//constants
const { PORT = 3002, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

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
