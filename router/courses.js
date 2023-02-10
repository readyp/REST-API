const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllCourses,
  getOneCourse,
  createCourse,
} = require("../controller/courses");

const CourseModel = require("../models/CourseModel");
const advancedResult = require("../middleware/advancedResult");

router
  .route("/")
  .get(
    advancedResult(CourseModel, {
      path: "bootcamp",
      select: "name description",
    }),
    getAllCourses
  )
  .post(createCourse);
router.route("/:id").get(getOneCourse);

module.exports = router;
