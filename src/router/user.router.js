const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  getAllUsers,
  updateUser,
  deleteUser,
  getCompanyUsers,
  loginUser,
  getCompanyDetails,
} = require("../controller/user.controller");
const fileUpload = require("../middlewares/fileUpload");
const {
  authenticateToken,
  authenticateUser,
} = require("../middlewares/auth");

//get method all chat
userRouter.get("/", getAllUsers);
userRouter.get("/Details/:id", getCompanyDetails);

//get method for username
userRouter.get("/company", getCompanyUsers);

//delete method
userRouter.delete("/:id", deleteUser);

//post method
userRouter.post("/register", fileUpload.single("profile"), signUp);
userRouter.post("/login", authenticateUser, loginUser);
userRouter.put(
  "/",
  fileUpload.single("profile"),
  authenticateToken,
  updateUser
);


module.exports = userRouter;
