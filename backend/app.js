const express = require("express");
const app = express();
require("express-async-errors");

require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
app.use(
  cors({
    origin: "*",
  })
);

const Authentication = require("./middleware/authentication");
//routers
const authRouters = require("./routes/auth");
const cartRouters = require("./routes/cart");
app.use(express.json());
//connect db
const connectDb = require("./database/connect");
//routes
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/cart", cartRouters);

app.use(errorHandler);

const start = async () => {
  try {
    //console.log(process.env.MONGO_URI);
    await connectDb(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("server is listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
