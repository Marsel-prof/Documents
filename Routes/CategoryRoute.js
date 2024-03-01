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

const router = express.Router();
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
