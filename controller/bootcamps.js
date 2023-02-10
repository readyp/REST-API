const asyncHandler = require("../middleware/asyncHandler");
const BootcampModel = require("../models/BootcampModel");
const ErrorResponse = require("../utils/ErrorResponse");
const geocoder = require("../utils/geocoder");

// Desc     Get all bootcamps
// Route    /api/v1/bootcamps
// Access   Public
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  // // field property to remove
  // const fieldProperties = ["select", "sort", "page", "limit"];

  // // copy request query
  // const reqQuery = { ...req.query };

  // // delete field property in reqQuery
  // fieldProperties.forEach((field) => delete reqQuery[field]);

  // // filtering gt, gte, lt, lte, in
  // const queryString = JSON.stringify(reqQuery).replace(
  //   /\b(gt|gte|lt|lte|in)\b/,
  //   (match) => `$${match}`
  // );

  // const query = BootcampModel.find(JSON.parse(queryString)).populate({
  //   path: "courses",
  //   select: "title -bootcamp",
  // });

  // // Select field to display
  // if (req.query.select) {
  //   const select = req.query.select
  //     .split(",")
  //     .map((item) => item.trim())
  //     .join(" ");
  //   query.select(select);
  // }

  // // Sort field by
  // if (req.query.sort) {
  //   const sortBy = req.query.sort
  //     .split(",")
  //     .map((item) => item.trim())
  //     .join(" ");
  //   query.sort(sortBy);
  // } else {
  //   query.sort("name");
  // }

  // // Pagination
  // let page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 25;
  // const totalDocs = await BootcampModel.countDocuments(JSON.parse(queryString));
  // const maxPage = Math.ceil(totalDocs / limit);
  // page = page > maxPage ? 1 : page;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  // // paginate
  // query.skip(startIndex).limit(limit);

  // // get page
  // const getPage = (pageNum) => {
  //   const fullpathUrl = `${req.protocol}://${req.get("host")}${
  //     req.originalUrl
  //   }`;

  //   if (/page/.test(fullpathUrl)) {
  //     return `${fullpathUrl}`.replace(/page\=[0-9]{1,}/, `page=${pageNum}`);
  //   }

  //   if (/\?/.test(fullpathUrl)) {
  //     return `${fullpathUrl}&page=${pageNum}`;
  //   }
  //   return `${fullpathUrl}?page=${pageNum}`;
  // };

  // // Pagination object
  // const pagination = {
  //   page,
  //   limit,
  //   maxPage,
  //   totalDocs,
  //   prev: startIndex > 0 ? getPage(page - 1) : null,
  //   next: endIndex < maxPage ? getPage(page + 1) : null,
  // };

  // // Exec query
  // const bootcamps = await query;

  const query = res.advancedResult;
  const pagination = res.pagination;

  const bootcamps = await query;

  res.status(200).json({
    success: true,
    message: "Get all bootcamps",
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

// Desc     Get single bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Public
exports.getOneBootcamps = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const bootcamp = await BootcampModel.findById(id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id: ${id}`, 404));
  }
  res.status(200).json({
    success: true,
    message: `Get one bootcamps with id: ${id}`,
    data: bootcamp,
  });
});

// Desc     create one bootcamps
// Route    /api/v1/bootcamps
// Access   Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcampBody = req.body;
  const newBootcamp = await BootcampModel.create(bootcampBody);
  res.status(201).json({
    success: true,
    message: "Create one bootcamps",
    data: newBootcamp,
  });
});

// Desc     Update one bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const updatedBootcamp = await BootcampModel.findByIdAndUpdate(
    id,
    updatedFields,
    { new: true, runValidators: true }
  );
  if (!updatedBootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id: ${id}`, 404));
  }
  res.status(201).json({
    success: true,
    message: `Update one bootcamps with id: ${id}`,
    data: updatedBootcamp,
  });
});

// Desc     Delete one bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedBootcamp = await BootcampModel.findById(id);
  if (!deletedBootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id: ${id}`, 404));
  }

  await deletedBootcamp.remove();
  res.status(200).json({
    success: true,
    message: `Delete bootcamps with id: ${id}`,
    data: {},
  });
});

// Desc     Get bootcamp by zipcode and distance
// Route    /api/v1/bootcamps/radius/:zipcode/:distance
// Access   Public
exports.getAllBootcampsByRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const { longitude, latitude } = loc[0];

  // radius earth 6371
  const radius = distance / 6371;

  const bootcamps = await BootcampModel.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });

  res.status(200).json({
    success: true,
    message: "Get All bootcamps by zipcode and distance",
    count: bootcamps.length,
    data: bootcamps,
  });
});
