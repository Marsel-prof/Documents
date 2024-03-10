const { json } = require("express");

class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    // to make filtration for data you will use query
    // example //* http://localhost:8000/api/v1/products?price=40&sold=25 /\ so here i want filtration by sold and price
    //! but i want to filtration by limit or page so what should i do ?
    // will create copy from query and delete element that i don't want filtration about it
    //? 1-filtering
    const queryStr = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
    excludesFields.map((field) => delete queryStr[field]);
    //{price: {$gte: 50}, ratingsAverage: {$gte: 50}} => mean greater than or equal
    //{ price: { gte: '50' }, ratingsAverage: { gte: '50' } }
    //?1.2 apply filtration by using [gte,gt,lte,lt]
    let querySTR = JSON.stringify(queryStr);
    querySTR = querySTR.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // this regular expression for catch each word form this and add before it $ to can mongoose know the words
    // in url http://localhost:8000/api/v1/products?price[gte]=50
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(querySTR));
    return this;
  }

  sort() {
    // to can make sort you will just use sort function => when use it in postman is sorting ascending to can sort
    // items descending will write sort=-price for example
    if (this.queryString.sort) {
      //if you want sort items by more one condition => let sort by price and sold
      // the query request will return price,sold but in method sort dose not accept ,
      // -sold,price => [-sold,price] => -sold price =>> and this will work in sort method
      const sortBy = this.queryString.sort.split(",").join(" ");
      //in url write as this ==> http://localhost:8000/api/v1/products?sort=price,-solid
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      // default will sort them by new products
      this.mongooseQuery = this.mongooseQuery.sort({ createdAt: -1 });
    }
    return this;
  }

  limitFields() {
    // to return selected fields not all fields, //* if you put -price => mean return all fields without price
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      // will return all element without __v
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if(modelName === "Products"){
      query.$or = [
        { title: { $regex: this.queryString.keyword, $options: "i" } },
        { description: { $regex: this.queryString.keyword, $options: "i" } },
      ]}
      else{
        query = { name: { $regex: this.queryString.keyword, $options: "i" } }
      };
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    //pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // next page
    if (endIndex < countDocuments) {
      pagination.nextPage = page + 1;
    } else {
      pagination.nextPage = null;
    }
    // previous page
    if (skip > 0) {
      pagination.previousPage = page - 1;
    } else {
      pagination.previousPage = null;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}
module.exports = ApiFeatures;
