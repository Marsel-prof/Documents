const express = require("express");
const dotenv = require("dotenv"); // this module is used when i have environment to protect my information ass password
//and API key and so in so this file will protect it by create file //! .getignore
// and this file will put inside it name all files that i don't want to upload it on github

dotenv.config({ path: "config.env" }); // put path of config environment
const morgan = require("morgan"); // this module is middleware => //* middleware => is a some steps between
const DbConnection = require("./config/database");
const router = require("./Routes/CategoryRoute");
//? http request and http response , how it can help me ? -> help to see logger and watching requests
//* when run your listening and get endpoint default will print in console GET / 200 2.378 ms - 6
const CategoryRoute = require("./Routes/CategoryRoute");
const ApiError = require("./shared/apiError");
const globalErrorHandler = require("./middlewares/ErrorMiddleware");
//================================================================
/* ----------------------Information about divide project --------------------
** first thing will create folder that contains a connection with database prefer named Config 
** the second thing will create folder that contains a logic that work with database //? function that has (req , res)
** and his logic for the methods ,this folder prefer named //* Controllers or Services
** the third thing will create folder that contains a Schema of each document and prefer named //! Models 
** and last thing will create folder that contains an Http Request -> get, pot , update , delete -> named //* Routes 
*----------------------------------------------------------------------------
! don't forget make exports for each functions inside each file to use it in other files 
** after that will come to main file js to use all files that i created it 
*/

DbConnection(); // called function connection with database from folder Config
/* =========================about connections =================
 ** important note when add url of your connection look at this url
 ** mongodb+srv://User:password@cluster0.yy0ydc3.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0
 ** after mongodb.net/ we put name of database //!ecommerce
 */
//----------------------------------------------------------------
const app = express();
app.use(express.json()); // to send data in body as json you should use express.json

// logger environment (middleware)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/** ========================how create endpoint=================================
 * to create endpoints inside main file :
 * ? that apply by method use(); -> this method takes to parameters :
 * * first -> the path that will use it to send request to server
 * * second -> the route that has a logic function to ged data from database that we created inside folder Routes
 */
app.use("/api/v1/categories", CategoryRoute);
//---------->Globals errors handling middleware<-------------
/** when i try to get some specific category with incorrect id the server return html error code
 ** and the express framework has middleware called error handling, so if i want return error as json will use error that
 **created inside express and is returned object (json type of error) so that let me control with style of error that returned
 *? so to make this will create error handling and pass it to express to error handling middleware
 **/
app.use("*", (req, res, next) => {
  // (*) => mean the route doesn't exist
  // but this is doesn't best way
  /*
   * const error = new Error(`Not Found this route ${req.originalUrl}`);
   *error.status = 404;
   *next(error); */ // mean => the next middleware should passing through it is error handling middleware
  next(new ApiError(`Not Found this route ${req.originalUrl}`, 404));
  // create class to handle error inside folder with name shared or utils
  // and then use this class with all errors
});
// global error for express
app.use(globalErrorHandler); // handle error middleware by creating this function inside folder middleware

const PORT = process.env.PORT || 8000; //use process.env to reach port form config.env
//? we but || 8000 so if was error in PORT will put this port
const server = app.listen(PORT, () => {
  console.log(`App run on Port: ${PORT}`);
});

// to can handel errors that happens outside express i will use Event
//? Event => listen on => callback(err)
process.on("unhandledRejection", (err) => {
  // process.on() -> listen on any event with type handled rejection -> inside my app outside express
  console.log(`Unhandled rejection error: ${err}`);
  //process.exit(1); // but this line if error happened while listening request will exit and stop request
  //so we want if server is closed then exit //* to make that will create const server on above code
  //* and close server then exit
  server.close(() => {
    console.log("shutting down...");
    process.exit(1);
  }); // so this code will run after finish request
});
/**==================express validator====================
 * why i use validator ? => the global express error come from database -> the client send request
 * for the route then controller then database -> then database exception error handling
 * but when i create validation errors that let me less requests on database so the requests pass 
 * through validation => if pass will go to database and get data | if not pass will return exception error handling
 * so this be better for performance 
 * in practice create middleware for validation , create folder validator inside shared folder and inside it 
 * create file for category validator rules 
 */
