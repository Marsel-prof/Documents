const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "Too short subcategory name"],
      maxlength: [32, "Too long subcategory name"],
      trim: true, // use to delete spacing before word or after word
    },
    slug: {
      type: String,
      lowercase: true, // make all characters lowercase
    },
    category: {
      // is a foreign key to make relationship between categories and sub-categories
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subCategory", subCategorySchema);
// there is linter you can install it to help us with finding errors earlier
/*
npm i -D eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y 
eslint-plugin-node eslint-plugin-prettier eslint-plugin-react prettier */
// this becomes as a extension to found errors without run code and to make this you need create json file
/* ===========json file that you should creating it with this name (.eslintrc.json)============
{
    "extends": ["airbnb", "prettier", "plugin:node/recommended"],
    "plugins": ["prettier"],
    "rules": {
      "spaced-comment": "off",
      "no-console": "off",
      "consistent-return": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-param-reassign": "off",
      "no-return-await": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "no-undef": "error",
      "node/no-unsupported-features/es-syntax": "off",
      "prefer-destructuring": ["warn", { "object": true, "array": false }],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "req|res|next|val" }]
    }
  }
 */
