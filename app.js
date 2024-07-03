const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database");
const cors = require("cors");
const notFound = require("./middlewares/notFoundPage");
const errorHandle = require("./middlewares/handleError");
const userRouter = require("./API/user/user.router");
const role = require("./API/role/role.router");
const reviewsRouter = require("./API/reviews/reviews.router");
const carCompanyRouter = require("./API/carCompany/carCompany.router");
const carTypeRouter = require("./API/carType/carType.router");
const carRouter = require("./API/car/car.router");
const locationRouter = require("./API/location/location.router");
const carDetailsRouter = require("./API/carDetails/carDetails.router");
const phoneRouter = require("./API/PhoneCode/phone");
const cityRouter = require("./API/city/city.router");
connectDB();
app.use(cors());

app.use(express.json());
const staticPath = path.join(path.dirname(""), "static/images");

app.use("/images", express.static(staticPath));
app.use("/users", userRouter);
app.use("/role", role);
app.use("/reviews", reviewsRouter);
app.use("/carCompany", carCompanyRouter);
app.use("/carType", carTypeRouter);
app.use("/car", carRouter);
app.use("/location", locationRouter);
app.use("/carDetails", carDetailsRouter);
app.use("/phone", phoneRouter);
app.use("/city", cityRouter);

// Page not found
app.use(notFound);

// Handle error
app.use(errorHandle);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
