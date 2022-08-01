const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('./configs/passport-config');



const authRouter = require("./api/authRouter.js");
const app = express();

require("dotenv").config();


//constants
const { PORT = 3002, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);

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
