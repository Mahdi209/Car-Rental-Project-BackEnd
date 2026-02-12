const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/database");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const PORT = process.env.PORT;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const staticPath = path.join(path.dirname(""), "public/images");
app.use("/images", express.static(staticPath));

// Define your routes
const notFound = require("./middlewares/notFoundPage");
const errorHandle = require("./middlewares/handleError");
const router = require("./router/index");

app.use("/api", router);

// Page not found
app.use(notFound);

// Handle error
app.use(errorHandle);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
