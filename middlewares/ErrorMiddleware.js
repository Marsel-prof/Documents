const globalErrorHandler = (err, req, res, next) => {
  //Because of these four parameters Express understands that this is middleware error handling
  // (next) to transport me from current middleware to next middleware
  //? --------------with this code i am determined style of error will return-------------
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  /*  res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack, //! mean where error happened
    }); */
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res); // to apply this you should go to package.json and inside scripts
    // add "prod": "NODE_ENV=production node server.js" => //! but will give you error so to solve this
    //* install this package npm install -g win-node-env
    //? then to use it just write in terminal npm run prod
  }
  //? -----------------------------------------------------------------------------------
  // i have three mode => development mode , stage mode and local mode
  // so it is not correct send error for above style in stage and local modes
};
// i will create function
const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = globalErrorHandler;
