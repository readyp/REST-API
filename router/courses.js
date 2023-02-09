const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllCourses } = require("../controller/courses");

router.route("/").get(getAllCourses);

module.exports = router;
