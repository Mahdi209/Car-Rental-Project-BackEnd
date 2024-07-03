const reviews = require("../../models/reviews.js");

const getReviews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const review = await reviews
      .find({ company: id })
      .populate("user", "fullName profile");

    res.json(review);
  } catch (error) {
    next(error);
  }
};

const getCompanyReviews = async (req, res, next) => {
  try {
    const { id } = req.user;
    const Comments = await reviews
      .find({ company: id })
      .populate("user", "fullName profile");

    if (!Comments.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this blog" });
    }

    res.status(200).json(Comments);
  } catch (error) {
    next(error);
  }
};

const createReviews = async (req, res, next) => {
  try {
    const newComment = {
      content: req.body.content,
      user: req.user.id,
      company: req.body.company,
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
