const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviews,
  getCompanyReviews,
  createReviews,
  deleteReviews,
  updateReviewsById,
} = require("./reviews.controller");
const { authenticateToken } = require("../../middlewares/auth");

reviewsRouter.get("/companyReviews/:id", getReviews);

reviewsRouter.get("/CompanyComment/", authenticateToken, getCompanyReviews);

reviewsRouter.delete("/:id", deleteReviews);

reviewsRouter.post("/", authenticateToken, createReviews);

reviewsRouter.put("/:id", updateReviewsById);

module.exports = reviewsRouter;
