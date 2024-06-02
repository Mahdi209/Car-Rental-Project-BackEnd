const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUsers,
  loginUser,
} = require("./user.controller");
const fileUpload = require("../middlewares/fileUpload");
const { authenticateUser } = require("../middlewares/auth");

//get method all chat
userRouter.get("/", getAllUsers);

//get method for username
userRouter.get("/:id", getSingleUsers);

//delete method
userRouter.delete("/:id", deleteUser);

//post method
userRouter.post("/register", fileUpload.single("profile"), signUp);
userRouter.post("/login", authenticateUser, loginUser);

//put method
userRouter.put("/:id", updateUser);

module.exports = userRouter;
