const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../Models/brandModel");
const ApiError = require("../shared/apiError");
const ApiFeatures = require("../shared/apiFeatures");
const factory = require("./handlersFactory");

// @desc get all Brands
// @Route Get /api/v1/brands
// @access public
exports.getBrand = factory.getAll(Brand)
/*  asyncHandler(async (req, res) => {
  const docCounts = await Brand.countDocuments();
  const apifeatures = new ApiFeatures(Brand.find(), req.query)
    .search()
    .sort()
    .filter()
    .limitFields()
    .paginate(docCounts);
  const { mongooseQuery, paginationResult } = apifeatures;
  const Brands = await mongooseQuery;
  res
    .status(200)
    .json({ result: Brands.length, paginationResult, data: Brands });
}); */

// @desc get specific Brand
// @Route Get /api/v1/brands/:id
// @access public
exports.getBrandById = factory.getOne(Brand)
 /* asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
}); */

// @desc create Brand
// @Route Post /api/v1/brands
// @access private
exports.createBrand = factory.createOne(Brand)
 /* asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  //* you can use async await instead of then and catch
  //* to make that you should install package express-async-handler, import it by require package then put all code inside it
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});
 */
// @desc update Brand
// @Route Put /api/v1/brands/:id
// @access private

// to can create shared update method will go to validator then make some changes to be sure from slug
exports.updateBrand = factory.updateOne(Brand)
/* asyncHandler(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: brand });
}); */

// @desc delete Brand
// @Route delete /api/brands/:id
// @access private
// because this code is same code in category so it don't correct repeated code so will create this code
// in folder with name handlerFactory and then will use it in more than controller
exports.deleteBrand = factory.deleteOne(Brand);
/* asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
}); */
