const user = require("../models/user");
const Location = require("../models/location");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const s3Client = require("../config/aws-s3");
const fs = require("fs").promises;
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const getFirebaseImageUrl = require("../config/storage");

const generateToken = (userCredentials) => {
  const payload = {
    id: userCredentials._id,
    username: userCredentials.username,
    email: userCredentials.email,
    fullName: userCredentials.fullName,
    role: userCredentials.role,
    profile: userCredentials.profile,
    city: userCredentials.city,
    phone: userCredentials.phone,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "5 days",
  });
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
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    // const imageUrl = await getFirebaseImageUrl(
    //   "user-profile",
    //   req.file.path,
    //   req.file.filename
    // );

    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const newUserData = {
      ...req.body,
      password: hashPassword,
      profile: req.file.path.split("public")[1],
    };

    const newUser = await user.create(newUserData);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    const id = req.user.id;

    delete updates.password;
    delete updates.email;

    let profileUrl;
    if (req.file) {
      if (req.user.profile) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME,
              Key: req.user.profile,
            }),
          );
        } catch (error) {
          console.error("Error deleting old profile:", error);
        }
      }

      const fileContent = await fs.readFile(req.file.path);
      const imageName = `profile/${req.file.filename}`;

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: fileContent,
        ContentType: req.file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(params));
      await fs.unlink(req.file.path);

      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
      });
      profileUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 5 * 24 * 60 * 60,
      });
      updates.profile = imageName;
    }

    const updatedUser = await user.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      select: "-password -__v",
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newToken = generateToken({
      ...updatedUser.toObject(),
      url: profileUrl || req.user.profile,
    });
    return res.json({ token: newToken });
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
