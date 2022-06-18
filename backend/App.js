const express = require("express");
const cookieparser = require("cookie-parser");
const fileupload = require("express-fileupload");
const app = express();
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoutes");
const paymentRoute = require("./routes/paymentRoute");
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

app.use(errorMiddleware);

module.exports = app;
