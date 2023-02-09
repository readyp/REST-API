const express = require("express");
const { getAllCourses } = require("../controller/courses");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllCourses);

module.exports = router;
