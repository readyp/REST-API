const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const router = require("./routers/bootcamps");
const connectDB = require("./config/db");

// load vars from env
dotenv.config({ path: "./config/config.env" });

const app = express();

// express body parse
app.use(express.json());

// router
app.use("/api/v1/bootcamps", router);

// mongoDB
connectDB();

const server = app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on PORT: ${process.env.PORT}`
      .yellow
  )
);

// Unhandle Promise Rejection
process.on("unhandledRejection", () => {
  server.close((err) => {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  });
});
