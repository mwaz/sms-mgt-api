const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const validation = require("../../utils/auth/authValidators");
const dBConfig = require("../../utils/dbConfig");

exports.signup = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    await validation.validateAuth(req);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err
    });
  }

 User.addUser(user, (err, user) => {
    if (err) {
      return res.status(409).json({
        success: false,
        message: "Failed to create the user," + ` ${err.message}` || err.message
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Registered Successfully",
        user
      });
    }
  });
};
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await validation.validateLogin(req);
    console.log(user)
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err
    });
  }

 await User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    User.comparePasswords(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          user.toJSON(),
          dBConfig.secret,
          {
            expiresIn: 604800
          }
        );

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Wrong Password" });
      }
    });
  });
};

exports.profile = (req, res, next) => {
  res.status(200).json({ user: req.user });
};