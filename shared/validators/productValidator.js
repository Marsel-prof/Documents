const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const category = require("../../Models/categoryModel");
const Subcategory = require("../../Models/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Too short Product name")
    .isLength({ max: 100 })
    .withMessage("Too long Product name"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Product description is required"),
  check("quantity")
    .notEmpty()
    .withMessage("the products quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("the products sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("the products price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 20000 })
    .withMessage("Too long price "),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("product price must be a number")
    .custom((value, { req }) => {
      // i use it to check some conditions
      if (req.body.price <= value) {
        // here check if the price after discount is correct value or not
        throw new Error("price after discount must be lower than normal price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("the product colors must be an array of strings"),
  check("imageCover")
    .notEmpty()
    .withMessage("the product image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("the product images must be an array of strings"),
  check("category")
    .notEmpty()
    .withMessage("the products category is required")
    .isMongoId()
    .withMessage("invalid id formate")
    .custom(
      (
        value //? check if category id is correct or not
      ) =>
        category.findById(value).then((Category) => {
          if (!Category) {
            return Promise.reject(new Error(`Invalid category id ${value}`));
          }
        })
    ),
  check("subCategory")
    .optional()
    .custom((value) => {
      // If no subcategories provided, return true
      if (!value) return true;
      // Convert subcategories to array if not already
      const subcategoriesId = Array.isArray(value) ? value : [value];
      // Check if subcategory IDs are valid
      return Subcategory.find({ _id: { $in: subcategoriesId } }).then(
        (result) => {
          if (result.length !== subcategoriesId.length || result.length < 1) {
            return Promise.reject(new Error("Invalid subcategory IDs"));
          }
        }
      );
    })
  // i need to check if subCategory is belong to same category that comes in body or not
  .custom((val, { req }) =>
    Subcategory.find({ category: req.body.category }).then((subCategories) => {
      const subCategoriesIdInDB = subCategories.map((subCat) =>
        subCat._id.toString()
      );
      //* this line checks if all ids come in body with the request are found in the array of ids that I created it or not
      //? if all ids were found will return true else will return false;
      if (!val.every((v) => subCategoriesIdInDB.includes(v))) {
        return Promise.reject(new Error("subCategories not belong to Category"));
      }
    }
  )
  ),
  check("brand").optional().isMongoId().withMessage("invalid id formate"),
  check("ratingsAverage")
    .isNumeric()
    .withMessage("the product rating must be a number")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Rating must be equal or above 1")
    .isLength({ max: 5 })
    .withMessage("Rating must be equal or below 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("the product rating quantity must be a number"),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("invalid Product id format"),
  validatorMiddleware,
];
// dry => don't repeat your self -> //* but here you should create for each endpoint his validator
//? because maybe you change validation rules for just one endpoint
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("invalid Product id format"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("invalid Product id format"),
  validatorMiddleware,
];
