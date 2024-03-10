const asyncHandler = require("express-async-handler");
const ApiError = require("../shared/apiError");
const ApiFeatures = require("../shared/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const NewDoc = await Model.create(req.body);
    res.status(201).json({ data: NewDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`No Brand for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName= '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterOjb) {
      filter = req.filterOjb;
    }
    const docCounts = await Model.countDocuments();
    const apifeatures = new ApiFeatures(Model.find(filter), req.query)
      .search(modelName)
      .sort()
      .filter()
      .limitFields()
      .paginate(docCounts);
    const { mongooseQuery, paginationResult } = apifeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ result: documents.length, paginationResult, data: documents });
  });
