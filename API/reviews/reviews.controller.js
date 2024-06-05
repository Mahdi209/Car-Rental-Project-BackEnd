const reviews = require("../../models/reviews.js");

const getReviews = async (req, res, next) => {
  try {
    const review = await reviews.find().populate("user", "fullName profile");

    res.json(review);
  } catch (error) {
    next(error);
  }
};

const getCarReviews = async (req, res, next) => {
  try {
    const id = req.user.id;
    const blogs = await reviews.find({ user: id }).populate("blog", "title");
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};
const getCompanyReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogComments = await reviews
      .find({ blog: id })
      .populate("user", "fullName profile");

    if (!blogComments.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this blog" });
    }

    res.status(200).json(blogComments);
  } catch (error) {
    next(error);
  }
};

const createReviews = async (req, res, next) => {
  try {
    const newReview = await reviews.create({ ...req.body, user: req.user.id });
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
  getCarReviews,
  createReviews,
  deleteReviews,
  updateReviewsById,
};
