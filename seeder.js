const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// load env vars
dotenv.config({ path: "./config/config.env" });

const BootcampModel = require("./models/BootcampModel");

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

// mongoose connect
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

const importBootcamps = async () => {
  try {
    await BootcampModel.create(bootcamps);
    console.log("Seed has been imported".green.inverse);
  } catch (error) {
    console.log(`There are an error: ${error.message}`.red.inverse);
  } finally {
    process.exit(1);
  }
};

const deleteBootcamps = async () => {
  try {
    await BootcampModel.deleteMany({});
    console.log("Bootcamps data has been destroy".red.inverse);
  } catch (error) {
    console.log(`There are an error: ${error.message}`);
  } finally {
    process.exit(1);
  }
};

console.log(process.argv);

if (process.argv[2] === "-i") {
  importBootcamps();
} else if (process.argv[2] === "-d") {
  deleteBootcamps();
}
