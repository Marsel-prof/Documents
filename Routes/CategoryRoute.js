const express = require("express");
const {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../Controller/CategoryController");
const {
  getCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../shared/validators/categoryValidator");
const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();
router.use("/:categoryId/subcategories", subCategoryRoute);// this route to return all subcategories
// for specified category id  
router.get("/", getCategory);
// or
router
  .route("/")
  .get(getCategory)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById) // function getCategoryValidator is function has rules and middleware
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory); // because id is variable iw put before it :

module.exports = router;
