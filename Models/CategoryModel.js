const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tha name is required"], // here the sentence is an error message
      unique: [true, "Name of this category was exist"],
      minlength: [3, "Too short category name"],
      maxlength: [20, "Too long category name"],
    },
    // the slug usually used by frontend to reach at one category but with his name instead of id
    // actually the frontend will use id to reach to category but in url will shown slug not id
    slug: {
      type: String,
      lowercase: true, // make all characters lowercase
    },

    image: String,
  },
  { timestamps: true }
); //timestamps use to add two fields on database -> createdAT , updatedAT => from type Date
const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
