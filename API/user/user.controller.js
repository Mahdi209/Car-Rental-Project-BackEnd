const user = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const getFirebaseImageUrl = require("../../config/firebaseStorageService");

const generateToken = (userCredentials) => {
  const payload = {
    id: userCredentials.id,
    username: userCredentials.username,
    email: userCredentials.email,
    fullName: userCredentials.fullName,
    profile: userCredentials.profile,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const getAllUsers = async (req, res, next) => {
  try {
    const userData = await user.find().populate("role", "name");
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const getCompanyUsers = async (req, res, next) => {
  try {
    const roleId = "665dd36e320441f73c286794";

    const userData = await user.find({ role: roleId });

    if (!userData || userData.length === 0)
      return res.status(404).send("Users not found.");

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(401).json({ message: "Profile picture is required" });
    }

    const imageUrl = await getFirebaseImageUrl(
      "user-profile",
      req.file.path,
      req.file.originalname
    );

    const saltRound = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashPassword;

    const newUserData = {
      ...req.body,
      profile: imageUrl,
    };
    const newUser = await user.create(newUserData);

    const token = generateToken(newUser);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await user.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await user.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  getAllUsers,
  updateUser,
  deleteUser,
  getCompanyUsers,
  loginUser,
};
