const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../Models/productModel");
const ApiError = require("../shared/apiError");

// @desc get all products
// @Route GET /api/v1/products
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const product = await Product.find()
    .skip(skip)
    .limit(limit)
    .populate([
      { path: "category", select: "name -_id" },
      { path: "brand", select: "name" }
    ]);
  res.status(200).json({ result: product.length, page, data: product });
});


// @desc get specific product
// @Route GET /api/v1/products/:id
// @access public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
// @desc create product
// @Route POST /api/v1/products
// @access private
exports.createProduct = asyncHandler(async (req, res) => {
//! be careful if you try to add new product with not existing category id will add correctly but this is wrong
//? so you should make validation on category id inside ProductValidator file and to now any thing you don't now 
//? about any library you can see the documentation of this library
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc update specific product
// @Route PUT /api/v1/products/:id
// @access private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if(req.body.title){
  req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc delete specific product
// @Route DELETE /api/v1/products/:id
// @access private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
