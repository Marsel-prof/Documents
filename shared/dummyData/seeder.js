const fs = require("fs"); // you should install it this help me to read or write data from and in other file
require("colors"); // just for make colors in terminal when add or delete
const dotenv = require("dotenv");
const Product = require("../../Models/productModel");
const dbConnection = require("../../config/database");

dotenv.config({ path: "../../config.env" });

// connect to DB => to can insert or delete data
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync("./Products.json")); // read data from the json file of product

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products); // create new product

    console.log("Data Inserted".green.inverse); //make bake ground in terminal with green color after inserted
    process.exit(); // then exist after finish
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany(); // to delete all data there are in product documentation
    console.log("Data Destroyed".red.inverse); // make background color red after delete all data
    process.exit(); // then exit after finish
  } catch (error) {
    console.log(error);
  }
};
// how run this file :
// node seeder.js -d
if (process.argv[2] === "-i") {
  // if write //* node seeder.js -i => insert data
  insertData();
} else if (process.argv[2] === "-d") {
  // if write //! node seeder.js -d => delete data
  destroyData();
}
