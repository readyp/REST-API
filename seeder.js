const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const coloers = require("colors");

const BootcampModel = require("./models/BootcampModel");
const CourseModel = require("./models/CourseModel");

// load env vars
dotenv.config({ path: "./config/config.env" });

// mongoose connect
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

// readfile bootcamps.json
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

// readfile courses.json
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`));

const importData = async () => {
  try {
    await BootcampModel.create(bootcamps);
    await CourseModel.create(courses);
    console.log("Seed has been imported".green.inverse);
  } catch (error) {
    console.log(`Errors: ${error.message}`.red);
  } finally {
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await BootcampModel.deleteMany({});
    await CourseModel.deleteMany({});
    console.log("Data has been destroyed".red.inverse);
  } catch (error) {
    console.log(`Errors: ${error.message}`.red);
  } finally {
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
