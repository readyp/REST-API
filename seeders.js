const dotenv = require("dotenv");
const colors = require("colors");
const fs = require("fs");
const mongoose = require("mongoose");
const BootcampModel = require("./models/BootcampModel");

// load env vars
dotenv.config({ path: "./config/config.env" });

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await BootcampModel.create(bootcamps);
    console.log("Data has been imported...".green.inverse);
    process.exit(1);
  } catch (err) {
    console.log(err.message.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await BootcampModel.deleteMany();
    console.log("Data has been destroyed...".red.inverse);
    process.exit(1);
  } catch (error) {
    console.log(error.message.red.inverse);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
