const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcryptjs");

exports.authenticateUser = async (req, res, next) => {
  try {
    const foundUser = await user.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(403).json({ message: "Username is not Found" });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!comparePassword) {
      return res
        .status(403)
        .json({ auth: false, token: null, message: "Invalid Password!" });
    }
    req.user = foundUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeder = req.headers.authorization;
    if (!authHeder) {
      return res
        .status(401)
        .json({ message: "No Token Provided!", error: "AUT_02" });
    }

    const token = authHeder.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
