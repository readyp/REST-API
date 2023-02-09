const asyncHandler = require("../middleware/asyncHandler");
const CourseModel = require("../models/CourseModel");

// Desc       Get all courses
// Route      /api/v1/courses
// Route      /api/v1/bootcamps/:bootcampId/courses
// Access     Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  let query;
  if (bootcampId) {
    query = CourseModel.find({ bootcamp: bootcampId });
  } else {
    query = CourseModel.find();
  }

  query.populate({ path: "bootcamp", select: "name description" });

  const courses = await query;

  res
    .status(200)
    .json({
      success: true,
      message: "Get All Courses",
      count: courses.length,
      data: courses,
    });
});
