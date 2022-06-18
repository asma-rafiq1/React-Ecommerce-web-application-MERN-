const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.Mongo_DB_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected with server ${data.connection.host}`);
    });
};

module.exports = connectDB;
