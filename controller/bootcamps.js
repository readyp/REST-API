const asyncHandler = require("../middleware/asyncHandler");

// Desc     Get all bootcamps
// Route    /api/v1/bootcamps
// Access   Public
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Get all bootcamps" });
});

// Desc     Get single bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Public
exports.getOneBootcamps = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Get one bootcamps with id: ${id}` });
});

// Desc     create one bootcamps
// Route    /api/v1/bootcamps
// Access   Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true, message: "Create one bootcamps" });
});

// Desc     Update one bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res
    .status(201)
    .json({ success: true, message: `Update one bootcamps with id: ${id}` });
});

// Desc     Delete one bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamps with id: ${id}` });
});
