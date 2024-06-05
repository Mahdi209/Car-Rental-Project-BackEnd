const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviews,
  getCompanyReviews,
  getCarReviews,
  createReviews,
  deleteReviews,
  updateReviewsById,
} = require("./reviews.controller");
const { authenticateToken } = require("../../middlewares/auth");

reviewsRouter.get("/", getReviews);
reviewsRouter.get("/commentForCar/:id", getCarReviews);

reviewsRouter.get("/CompanyComment/", authenticateToken, getCompanyReviews);

reviewsRouter.delete("/:id", deleteReviews);

reviewsRouter.post("/", authenticateToken, createReviews);

reviewsRouter.put("/:id", updateReviewsById);

module.exports = reviewsRouter;
