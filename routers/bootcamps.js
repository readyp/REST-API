const express = require("express");
const router = express.Router();

const {
  getAllBootcamp,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../controllers/bootcamps");

router.route("/").get(getAllBootcamp).post(createBootcamps);

router
  .route("/:id")
  .get(getOneBootcamps)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
