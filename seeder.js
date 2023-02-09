const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

const BootcampModel = require("./models/BootcampModel");
const CourseModel = require("./models/CourseModel");

// load env vars
dotenv.config({ path: "./config/config.env" });

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`));

// mongoose connect
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await BootcampModel.create(bootcamps);
    await CourseModel.create(courses);
    console.log("Seed has been imported".green.inverse);
  } catch (error) {
    console.log(`There are an error: ${error.message}`.red.inverse);
  } finally {
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await BootcampModel.deleteMany({});
    await CourseModel.deleteMany({});
    console.log("Data has been destroy".red.inverse);
  } catch (error) {
    console.log(`There are an error: ${error.message}`);
  } finally {
    process.exit(1);
  }
};

console.log(process.argv);

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
