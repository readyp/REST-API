const asyncHandler = require("../middleware/asyncHandler");
const BootcampModel = require("../models/BootcampModel");
const ErrorResponse = require("../utils/ErrorResponse");
const geocoder = require("../utils/geocoder");

// Desc     Get all bootcamps
// Route    /api/v1/bootcamps
// Access   Public
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  // copy req query
  const reqQuery = { ...req.query };

  // field property to remove
  const fieldProperties = ["select", "sort", "limit", "page"];

  // remove field from reqQuery
  fieldProperties.forEach((field) => delete reqQuery[field]);

  // filter result with gt, gte, lt, lte, and in
  const queryString = JSON.stringify(reqQuery).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  const query = BootcampModel.find(JSON.parse(queryString)).populate("courses");

  // Select field to display
  if (req.query.select) {
    const select = req.query.select
      .split(",")
      .map((item) => item.trim())
      .join(" ");

    query.select(select);
  }

  // Sorting result
  if (req.query.sort) {
    const sortBy = req.query.sort
      .split(",")
      .map((item) => item.trim())
      .join(" ");
    query.sort(sortBy);
  } else {
    query.sort("name");
  }

  // pagination
  let page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25; //change to 25 after finish testing
  const totalDocs = await BootcampModel.countDocuments(JSON.parse(queryString));
  const maxPage = Math.ceil(totalDocs / limit);
  page = page > maxPage ? 1 : page;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // paginate
  query.skip(startIndex).limit(limit);

  // get page url
  const getPage = (numPage) => {
    const fullPathUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`;
    if (/page/.test(fullPathUrl)) {
      return fullPathUrl.replace(/page\=[0-9]{1,}/, `page=${numPage}`);
    }
    return `${fullPathUrl}&page=${numPage}`;
  };

  // pagination object
  const pagination = {
    page,
    limit,
    maxPage,
    totalDocs,
    prev: startIndex > 0 ? getPage(page - 1) : null,
    next: endIndex < totalDocs ? getPage(page + 1) : null,
  };

  // Exec query
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
  deletedBootcamp.remove();
  res.status(200).json({
    success: true,
    message: `Delete bootcamps with id: ${id}`,
    data: {},
  });
});

// Desc       Get bootcamps by zipcode and distance
// Route      /api/v1/bootcamps/radius/:zipcode/:distance
// Access     Publi
exports.getBootcampByRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const { longitude, latitude } = loc[0];
  const radius = distance / 6738;

  const bootcamps = await BootcampModel.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });

  return res.status(200).json({
    success: true,
    message: "Get bootcamp by zipcode and distance",
    count: bootcamps.length,
    data: bootcamps,
  });
});
