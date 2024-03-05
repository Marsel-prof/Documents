const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../Models/brandModel");
const ApiError = require("../shared/apiError");

// @desc get all Brands
// @Route Get /api/v1/brands
// @access public
exports.getBrand = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brand = await Brand.find().skip(skip).limit(limit);
  res.status(200).json({ result: brand.length, data: brand });
});

// @desc get specific Brand
// @Route Get /api/v1/brands/:id
// @access public
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc create Brand
// @Route Post /api/v1/brands
// @access private
exports.createBrand = asyncHandler(async (req, res, next) => {
  const {name} = req.body;
  //* you can use async await instead of then and catch
  //* to make that you should install package express-async-handler, import it by require package then put all code inside it
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc update Brand
// @Route Put /api/v1/brands/:id
// @access private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name);
  const brand = await Brand.findByIdAndUpdate(
    { _id: id },
    { name, slug },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc delete Brand
// @Route delete /api/brands/:id
// @access private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
