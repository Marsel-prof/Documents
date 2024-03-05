const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tha name is required"], 
      unique: [true, "Name of this category was exist"],
      minlength: [3, "Too short category name"],
      maxlength: [20, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },

    image: String,
  },
  { timestamps: true }
); //timestamps use to add two fields on database -> createdAT , updatedAT => from type Date
module.exports = mongoose.model("Brand", BrandSchema);

