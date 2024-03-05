const express = require("express");

const {
  createSubCategory,
  deleteSubCategoryById,
  getSubCategories,
  getSubCategoryById,
  updateSubCategoryById,
  setCategoryIdToBody,
  createFilterObj
} = require("../Controller/subCategoryController");
const {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../shared/validators/subCategoryValidator");

// the merge params allow us to access parameters on other routers
// ex: we need to access on category id form category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
  .get(createFilterObj,getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategoryById)
  .delete(deleteSubCategoryValidator, deleteSubCategoryById);
module.exports = router;
