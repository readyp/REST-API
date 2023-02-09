const asyncHandler = require("../middleware/asyncHandler");
const CourseModel = require("../models/CourseModel");

// Desc       Get all courses or Get all courses by bootcamps
// Route      /api/v1/courses
// Route      /api/v1/bootcamps/:bootcampId/courses
// Access     Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  let query;
  if (bootcampId) {
    query = await CourseModel.find({ bootcamp: bootcampId });
  } else {
    query = await CourseModel.find();
  }

  res
    .status(200)
    .json({
      success: true,
      message: "Get all courses",
      count: query.length,
      data: query,
    });
});
