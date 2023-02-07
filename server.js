const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

const bootcampsRouter = require("./router/bootcamps");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

// load vars
dotenv.config({ path: "./config/config.env" });

// app
const app = express();

// logger middleware using morgan
app.use(morgan("dev"));

// body parser
app.use(express.json());

// bootcamps router
app.use("/api/v1/bootcamps", bootcampsRouter);

// error handler middleware
app.use(errorHandler);

// connectDB
connectDB();

// start up server
const server = app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server is up in ${process.env.NODE_ENV.bold} on PORT: ${process.env.PORT}`
      .yellow
  )
);

// Unhandled Promise Rejected
process.on("unhandledRejection", () => {
  server.close(() => {
    console.log("Unhandle Promise rejection");
    process.exit(1);
  });
});
