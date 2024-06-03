const comment = require("../models/reviews.js");

const getComment = async (req, res, next) => {
  try {
    const comments = await comment
      .find()
      .populate("user", "fullName profile")
      .populate("blogs", "title introduction image");

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const getUserComment = async (req, res, next) => {
  try {
    const id = req.user.id;
    const blogs = await comment.find({ user: id }).populate("blog", "title");
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};
const getBlogComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogComments = await comment
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

const createComment = async (req, res, next) => {
  try {
    const newComment = await comment.create({ ...req.body, user: req.user.id });
    res.json(newComment);
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Invalid blog ID");
    }
    await comment.findByIdAndDelete(id);
    res.json({ message: `Message delete successfully` });
  } catch (error) {
    next(error);
  }
};

const updateCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateComment = req.body;
    await comment.findByIdAndUpdate(id, updateComment, { new: true });

    res.json({ message: `Blog update successfully` });
  } catch (error) {
    next(error);
  }
};

// const search = async (req, res, next) => {
//   try {
//     const { title } = req.query;
//     if (!title) {
//       return res.status(400).json({ error: "Text parameter is required" });
//     }
//     const matchTitle = await comment.find({
//       title: { $regex: new RegExp(text, "i") },
//     });
//     res.json(matchTitle);
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  getComment,
  getUserComment,
  getBlogComments,
  createComment,
  deleteComment,
  updateCommentById,
};
