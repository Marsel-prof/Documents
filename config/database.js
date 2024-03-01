const mongoose = require("mongoose");
const DbConnection = () => {
  mongoose
    .connect(process.env.DB_URL).then((connection) => {
      console.log(`Connected to database : ${connection.connection.host}`); //? host of database
    })
    // this error is outside express so will create handing errors globally for like errors in server file 
   /*  .catch((error) => {
      console.log(`Error connecting to database : ${error}`);
      process.exit(1); //? to stop your application
    }); */
};

module.exports = DbConnection;
