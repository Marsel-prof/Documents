const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const SubCategory = require("../Models/subCategoryModel");
const ApiError = require("../shared/apiError");
const factory =  require("./handlersFactory")


// @desc create subCategory
// @Route POST /api/v1/subcategories
// @access private

// if i want to add subCategory for a specific category then put hit inside the routes subcategory
exports.setCategoryIdToBody = (req, res, next) => {
  if(!req.body.category) req.body.category = req.params.categoryId;
  next();
}
exports.createSubCategory = factory.createOne(SubCategory)
/* asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
}); */

// if i want to get children from parent for example i want to get all subcategories with some category id
// @Route GET api/categories/:categoryId/subcategories
// and this called Nested Route => to make this will add this changes on under code
exports.createFilterObj = (req,res,next) =>{
    // this to line to get subCategories for specific category 
    let filterObject = {};
    if (req.params.categoryId) filterObject = {category: req.params.categoryId}
    //if you see we put inside find() function the object filter //? how is work ? 
    req.filterOjb = filterObject;
    next();
}
// @desc get subCategories
// @Route GET /api/v1/subcategories
// @access public
exports.getSubCategories = factory.getAll(SubCategory);
/*  asyncHandler(async (req, res) => {
  // --------------to make pagination-------------
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  //* if the the params was has a id of category so will function search about subCategories with have 
  //* same category id that found in params if not will return all subCategories 
  const subcategory = await SubCategory.find(req.filterOjb).skip(skip).limit(limit);
  //.populate("category");// the populate function is used to return associated parent object(here category)
  // this will return all all object category that is parent for each subcategory
  // if you want to return only name of category you can make this
  //.populate({ path: "category", select: "name -_id" }); // here will return just name //?what mean -_id
  //* mean i want return just name without id of category
  res.status(200).json({ result: subcategory.length, data: subcategory });
}); */

// @desc get subCategory by id
// @Route GET /api/v1/subcategories/:id
// @access public
exports.getSubCategoryById = factory.getOne(SubCategory)
/*  asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);
  /*   .populate({
    path: "category",
    select: "name -_id",
  }); */
  // how populate is work //? first will create query to get subCategory the will create new query to
  //? get category that subcategory returned with then let show just name of category by select mean
  //? my request make to queries
  //if (!subcategory) {
    //return next(new ApiError(`No subcategory for this id ${id}`, 404));
  //}
  //res.status(200).json({ data: subcategory });
//});

// @desc update subCategory by id
// @Route PUT /api/v1/subcategories/:id
// @access private
exports.updateSubCategoryById = factory.updateOne(SubCategory)
/*  asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { category } = req.body;
  const subcategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, category, slug: slugify(name) },
    { new: true }
  );
  if (!subcategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
}); */

// @desc delete subCategory by id
// @Route DELETE /api/v1/subcategories/:id
// @access private

exports.deleteSubCategoryById = factory.deleteOne(SubCategory);
/* asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);
  if (!subcategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});
 */