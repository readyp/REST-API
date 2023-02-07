const express = require("express");

const {
  getAllBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsByRadius,
} = require("../controller/bootcamps");
const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getBootcampsByRadius);

router.route("/").get(getAllBootcamps).post(createBootcamps);

router
  .route("/:id")
  .get(getOneBootcamps)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
