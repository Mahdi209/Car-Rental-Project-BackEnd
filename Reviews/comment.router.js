const express = require("express");
const commentRouter = express.Router();
const {
  getComment,
  getUserComment,
  getBlogComments,
  createComment,
  deleteComment,
  updateCommentById,
} = require("./comment.controller");
const { authenticateToken } = require("../middlewares/auth");

// //get Blog by search query
// commentRouter.get("/search", search);

//get method all blog
commentRouter.get("/", getComment);
commentRouter.get("/commentForBlog/:id", getBlogComments);

//get all blog by user id
commentRouter.get("/userComment/", authenticateToken, getUserComment);

//delete method
commentRouter.delete("/:id", deleteComment);

//post method
commentRouter.post("/", authenticateToken, createComment);

//put method
commentRouter.put("/:id", updateCommentById);

module.exports = commentRouter;
