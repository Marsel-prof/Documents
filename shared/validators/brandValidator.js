const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  // write rules for validate
  check("id").isMongoId().withMessage("invalid Brand id format"),
  // middleware function that applies this rules above
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 20 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];

// dry => don't repeat your self -> //* but here you should create for each endpoint his validator
//? because maybe you change validation rules for just one endpoint
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  check("name")
    .notEmpty()
    .withMessage("you can not leave empty Brand name")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 20 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleware,
];
