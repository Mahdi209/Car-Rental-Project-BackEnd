const user = require("../../models/user");
const Location = require("../../models/location");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const getFirebaseImageUrl = require("../../config/firebaseStorageService");

const generateToken = (userCredentials) => {
  const payload = {
    id: userCredentials.id,
    username: userCredentials.username,
    email: userCredentials.email,
    fullName: userCredentials.fullName,
    role: userCredentials.role,
    profile: userCredentials.profile,
    city: userCredentials.city,
    phone: userCredentials.phone,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "5 days",
  });
  return token;
};

const getAllUsers = async (req, res, next) => {
  try {
    const userData = await user
      .find()
      .populate("role", "name")
      .populate("city", "name");
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const getCompanyUsers = async (req, res, next) => {
  try {
    const roleId = "665dd36e320441f73c286794";

    const userData = await user
      .find({ role: roleId })
      .populate("city", "name")
      .select("-password");

    if (!userData || userData.length === 0)
      return res.status(404).send("Users not found.");

    res.json(userData);
  } catch (error) {
    next(error);
  }
};
const getCompanyDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const userData = await user
      .findById(id)
      .populate("city", "name")
      .select("-password -__v");

    const loc = await Location.find({ user: id });

    if (!userData || userData.length === 0)
      return res.status(404).send("Users not found.");
    const userDetails = {
      user: userData,
      location: loc,
    };

    res.json(userDetails);
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
      req.file.filename
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
    const updates = req.body;
    const id = req.user.id;

    if (req.file) {
      const imageUrl = await getFirebaseImageUrl(
        "user-profile",
        req.file.path,
        req.file.filename
      );
      updates.profile = imageUrl;
    } else {
      updates.profile = req.user.profile;
    }

    const updatedUser = await user.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    const newToken = generateToken(updatedUser);

    res.json({ token: newToken });
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
  getCompanyDetails,
};
