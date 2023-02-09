const express = require("express");

const {
  getAllBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampByRadius,
} = require("../controller/bootcamps");
const courseRouter = require("./courses");

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getAllBootcamps).post(createBootcamps);
router
  .route("/:id")
  .get(getOneBootcamps)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

router.route("/radius/:zipcode/:distance").get(getBootcampByRadius);

module.exports = router;
