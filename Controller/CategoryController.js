const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../Models/categoryModel");
const ApiError = require("../shared/apiError");

// @desc get all categories
// @Route Get /api/v1/categories
// @access public
exports.getCategory = asyncHandler(async (req, res) => {
  // --------------to make pagination-------------
  const page = req.query.page * 1 || 1; // make this to let users determine the pages and limits
  const limit = req.query.limit * 1 || 5; // i multiply the query with one to convert it form string to a number
  const skip = (page - 1) * limit; // (2-1) * 5 -> 1 * 5 = 5 => means skip first 5 categories
  const category = await Category.find().skip(skip).limit(limit); // skip and limit functions => use to apply pagination
  res.status(200).json({ result: category.length, data: category });
});

// @desc get specific category
// @Route Get /api/v1/categories/:id
// @access public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc create category
// @Route Post /api/v1/categories
// @access private
exports.createCategory = asyncHandler(async (req, res, next) => {
  //---------------------with using async await------------------
  const {name} = req.body;
  //* you can use async await instead of then and catch
  //* to make that you should install package express-async-handler, import it by require package then put all code inside it
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
  /* -------------then and catch method--------------------------
  CategoryModel.create({
    name,
    slug: slugify(name), //* i use this method by install slugify => this method convert name to lowercase and dashed
    / a and b => https:shopping.com/a-and-b
  })
  .then(category => res.status(201).json({data : category}))
  .catch(err => res.status(400).send(err));
  ---------------without using function create-------------------*/
  // or i can use new
  // const newCategory = new CategoryModel({
  //   name,
  //   slug: slugify(name),
  // });
  // newCategory.save().then(category => res.status(201).json({data : category})).catch(err => res.status(400).send(err));
});

// @desc update category
// @Route Put /api/v1/categories/:id
// @access private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name);
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name, slug },
    { new: true }
  ); // new : true to return
  // data after update it
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc delete category
// @Route delete /api/categories/:id
// @access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
