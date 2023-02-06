const BootcampModel = require("../models/BootcampModel");

// Desc     Get All Bootcamps
// Route    /api/v1/bootcamps
// Access   Public
exports.getAllBootcamp = async (req, res, next) => {
  const bootcamps = await BootcampModel.find();
  res
    .status(200)
    .json({ success: true, message: "Get All Bootcamps", data: bootcamps });
};

// Desc     Get One Bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Public
exports.getOneBootcamps = async (req, res, next) => {
  const { id } = req.params;
  const bootcamp = await BootcampModel.findById(id);
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({
    success: true,
    message: `Get One Bootcamps id: ${id}`,
    data: bootcamp,
  });
};

// Desc     Create New Bootcamps
// Route    /api/v1/bootcamps
// Access   Private
exports.createBootcamps = async (req, res, next) => {
  const bootcampBody = req.body;
  const newBootcamp = await BootcampModel.create(bootcampBody);
  res.status(200).json({
    success: true,
    message: "Create new bootcamps",
    data: newBootcamp,
  });
};

// Desc     Update One Bootcamps
// Route    /api/v1/bootcamps:id
// Access   Private
exports.updateBootcamps = async (req, res, next) => {
  const { id } = req.params;
  const updatedJson = req.body;
  const updatedBootcamps = await BootcampModel.findByIdAndUpdate(
    id,
    updatedJson,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    message: `Update Bootcamps with id: ${id}`,
    data: updatedBootcamps,
  });
};

// Desc     Delete One Bootcamps
// Route    /api/v1/bootcamps/:id
// Access   Private
exports.deleteBootcamps = async (req, res, next) => {
  const { id } = req.params;
  const deletedBootcamp = await BootcampModel.findByIdAndDelete(id);
  if (!deletedBootcamp) {
    return res.status(400).json({ success: false });
  }
  res
    .status(200)
    .json({ success: true, message: `Delete Bootcamps with id: ${id}` });
};
