const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../Models/productModel");
const ApiError = require("../shared/apiError");
const ApiFeatures = require("../shared/apiFeatures");
const factory =  require("./handlersFactory")

// @desc get all products
// @Route GET /api/v1/products
// @access public
exports.getProducts = factory.getAll(Product,"Products")
/*  asyncHandler(async (req, res) => {
  const docCounts = await Product.countDocuments();
  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search("Products")
    .sort()
    .filter()
    .limitFields()
    .paginate(docCounts);
  const { mongooseQuery, paginationResult } = apifeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ result: products.length, paginationResult, data: products });
});
 */
// @desc get specific product
// @Route GET /api/v1/products/:id
// @access public
exports.getProductById = factory.getOne(Product)
 /* asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
}); */
// @desc create product
// @Route POST /api/v1/products
// @access private
exports.createProduct = factory.createOne(Product)
 /* asyncHandler(async (req, res) => {
  //! be careful if you try to add new product with not existing category id will add correctly but this is wrong
  //? so you should make validation on category id inside ProductValidator file and to now any thing you don't now
  //? about any library you can see the documentation of this library
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
}); */

// @desc update specific product
// @Route PUT /api/v1/products/:id
// @access private
exports.updateProduct = factory.updateOne(Product)
 /* asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
}); */

// @desc delete specific product
// @Route DELETE /api/v1/products/:id
// @access private
exports.deleteProduct = factory.deleteOne(Product);
 /* asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
}); */
