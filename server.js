const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const bootcampsRouter = require("./router/bootcamps");
const errorHandler = require("./middleware/errorHandler");

// load vars
dotenv.config({ path: "./config/config.env" });

// app
const app = express();

// logger middleware using morgan
app.use(morgan("dev"));

// bootcamps router
app.use("/api/v1/bootcamps", bootcampsRouter);

// error handler middleware
app.use(errorHandler);

// start up server
app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server is up in ${process.env.NODE_ENV} on PORT: ${process.env.PORT}`
  )
);
