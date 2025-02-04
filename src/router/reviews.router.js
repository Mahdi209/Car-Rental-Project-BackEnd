const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviews,
  getCompanyReviews,
  createReviews,
  deleteReviews,
  updateReviewsById,
} = require("../controller/reviews.controller");
const { authenticateToken } = require("../middlewares/auth");

reviewsRouter.get("/companyReviews/:id", getReviews);

reviewsRouter.get("/DashboardCompanyReview/", authenticateToken, getCompanyReviews);

reviewsRouter.delete("/:id", deleteReviews);

reviewsRouter.post("/", authenticateToken, createReviews);

reviewsRouter.put("/:id", updateReviewsById);

module.exports = reviewsRouter;
