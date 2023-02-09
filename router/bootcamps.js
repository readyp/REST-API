const express = require("express");

const {
  getAllBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../controller/bootcamps");
const coursesRouter = require("./courses");
const router = express.Router();

// router use course router
router.use("/:bootcampId/courses", coursesRouter);

router.route("/").get(getAllBootcamps).post(createBootcamps);
router
  .route("/:id")
  .get(getOneBootcamps)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
