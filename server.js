const app = require("./backend/App");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/database");

dotenv.config({ path: "backend/config/config.env" });

//Unhandled uncaught Exception
process.on("uncaughtException", (err) => {
  //for console.log(youtube) undefined variables
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception"); //crashing server on purpose
  process.exit(1);
});

//Connect Database
connectDB();
console.log("server side");

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening at port no. ${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  //No need to write catch block
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
