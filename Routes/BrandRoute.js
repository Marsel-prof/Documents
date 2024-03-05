const express = require("express");
const {
  getBrand,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../Controller/BrandController");
const {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator
} = require("../shared/validators/brandValidator");

const router = express.Router();

router.route("/").get(getBrand).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
