const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database");
const cors = require("cors");
const notFound = require("./middlewares/notFoundPage");
const errorHandle = require("./middlewares/handleError");
connectDB();
app.use(cors());

app.use(express.json());
const staticPath = path.join(path.dirname(""), "static/images");

app.use("/images", express.static(staticPath));

// Page not found
app.use(notFound);

// Handle error
app.use(errorHandle);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
