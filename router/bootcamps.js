const express = require("express");

const {
  getAllBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getAllBootcampsByRadius,
} = require("../controller/bootcamps");
const coursesRouter = require("./courses");
const BootcampModel = require("../models/BootcampModel");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router();

// router use course router
router.use("/:bootcampId/courses", coursesRouter);

router.route("/radius/:zipcode/:distance").get(getAllBootcampsByRadius);

router
  .route("/")
  .get(
    advancedResult(BootcampModel, {
      path: "courses",
      select: "title -bootcamp",
    }),
    getAllBootcamps
  )
  .post(createBootcamps);

router
  .route("/:id")
  .get(getOneBootcamps)
  .put(updateBootcamps)
  .delete(deleteBootcamps);
module.exports = router;
