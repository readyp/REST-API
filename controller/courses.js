const asyncHandler = require("../middleware/asyncHandler");
const BootcampModel = require("../models/BootcampModel");
const CourseModel = require("../models/CourseModel");
const ErrorResponse = require("../utils/ErrorResponse");

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

  res.status(200).json({
    success: true,
    message: "Get All Courses",
    count: courses.length,
    data: courses,
  });
});

// Desc       Get one courses
// Route      /api/v1/courses/:id
// Access     Public
exports.getOneCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await CourseModel.findById(id).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!course) {
    return next(new ErrorResponse(`Course not found with id: ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    message: `Get one course with id: ${id}`,
    data: course,
  });
});

// Desc       Create new course
// Route      /api/v1/bootcamps/:bootcampId/courses
// Access     Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  req.body.bootcamp = bootcampId;

  const bootcamp = await BootcampModel.findById(bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id: ${bootcampId}`, 404)
    );
  }

  const courseBody = req.body;
  const course = await CourseModel.create(courseBody);

  res
    .status(201)
    .json({ success: true, message: "Create new course", data: course });
});
