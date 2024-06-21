const User = require('../models/User');
const Profile = require('../models/Profile');
const Token = require("../models/Token");
const Blacklist = require('../models/Blacklist');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.Register = async (req, res) => {
  // get required variables from request body
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Passwords do not match.",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "It seems you already have an account, please log in instead.",
      });
    }

    // create an instance of a user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save new user into the database
    const savedUser = await newUser.save();

    const newProfile = new Profile({
      userId: savedUser._id,
      first_name: '',
      last_name: '',
      birthday: '',
      tel: '',
      role: 'user' // default role
    });
    await newProfile.save();

    const { ...user_data } = savedUser._doc;

    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `http://localhost:8080/auth/users/${newUser.id}/verify/${token.token}`;
    await sendEmail(newUser.email, "Verify Email", url);

    res.status(200).json({
      status: "success",
      data: [user_data],
      message: "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

exports.Login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Account does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
  
      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }
  
    let options = {
      maxAge: 20 * 60 * 1000, // 20 minutes
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    const token = user.generateAccessJWT();
    res.cookie("SessionID", token, options);
    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      token // Return the token in the response body
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message || "Internal Server Error",
    });
  }
  res.end();
}



exports.Logout = async (req, res) => {
  try {
    const authHeader = req.headers['cookie']; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(';')[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader('Clear-Site-Data', '"cookies"');
    res.status(200).json({ message: 'You are logged out!' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
  res.end();
}

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};