const { GetObjectCommand } = require("@aws-sdk/client-s3");
const reviews = require("../models/reviews.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../config/aws-s3.js");

const getReviews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userReviews = await reviews
      .find({ company: id })
      .populate("user", "fullName profile");

    for (let singleReview of userReviews) {
      const imageKey = singleReview.user.profile;
      if (imageKey) {
        try {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: imageKey,
          });
          const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 5 * 24 * 60 * 60 });
          singleReview.user.profile = signedUrl;
        } catch (err) {
          console.error(`Error generating signed URL for key ${imageKey}:`, err);
          singleReview.user.profile = null; // Handle errors gracefully by setting profile to null if the URL generation fails
        }
      }
    }
    res.json(userReviews);
  } catch (error) {
    next(error);
  }
};


const getCompanyReviews = async (req, res, next) => {
  try {
    const { id } = req.user;
    const companyReviews = await reviews
      .find({ company: id })
      .populate("user", "fullName profile");

    if (!companyReviews.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this company" });
    }
    for (let singleReview of companyReviews) {
      const imageKey = singleReview.user.profile;
      if (imageKey) {
        try {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: imageKey,
          });
          const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 5 * 24 * 60 * 60 });
          singleReview.user.profile = signedUrl;
        } catch (err) {
          console.error(`Error generating signed URL for key ${imageKey}:`, err);
          singleReview.user.profile = null; // Handle errors gracefully by setting profile to null if the URL generation fails
        }
      }
    }

    res.status(200).json(companyReviews);
  } catch (error) {
    next(error);
  }
};

const createReviews = async (req, res, next) => {
  try {
    console.log(req.body)
    const newComment = {
      content: req.body.content,
      user: req.user.id,
      company: req.body.company,
      star: req.body.rating,
    };
    const newReview = await reviews.create(newComment);
    res.json(newReview);
  } catch (error) {
    next(error);
  }
};
const deleteReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Invalid blog ID");
    }
    await reviews.findByIdAndDelete(id);
    res.json({ message: `Message delete successfully` });
  } catch (error) {
    next(error);
  }
};

const updateReviewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateComment = req.body;
    await reviews.findByIdAndUpdate(id, updateComment, { new: true });

    res.json({ message: `review update successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  getCompanyReviews,
  createReviews,
  deleteReviews,
  updateReviewsById,
};
