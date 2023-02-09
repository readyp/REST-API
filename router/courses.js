const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllCourses,
  getOneCourse,
  createCourse,
} = require("../controller/courses");

router.route("/").get(getAllCourses).post(createCourse);
router.route("/:id").get(getOneCourse);

module.exports = router;
