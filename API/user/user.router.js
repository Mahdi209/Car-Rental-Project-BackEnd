const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  getAllUsers,
  updateUser,
  deleteUser,
  getCompanyUsers,
  loginUser,
} = require("./user.controller");
const fileUpload = require("../../middlewares/fileUpload");
const { authenticateUser } = require("../../middlewares/auth");

//get method all chat
userRouter.get("/", getAllUsers);

//get method for username
userRouter.get("/company", getCompanyUsers);

//delete method
userRouter.delete("/:id", deleteUser);

//post method
userRouter.post("/register", fileUpload.single("profile"), signUp);
userRouter.post("/login", authenticateUser, loginUser);

//put method
userRouter.put("/:id", updateUser);

module.exports = userRouter;
