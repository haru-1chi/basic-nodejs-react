const User = require("../models/User");
const Profile = require("../models/Profile");
const Token = require("../models/Token");
const Blacklist = require("../models/Blacklist");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const juice = require("juice");

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
      first_name: "",
      last_name: "",
      birthday: "",
      tel: "",
      role: "user", // default role
    });
    await newProfile.save();

    const { ...user_data } = savedUser._doc;

    const token = await new Token({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `http://localhost:8080/auth/users/${newUser.id}/verify/${token.token}`;
    const inlinedHtml = juice(
      verifiedemail.replace("{{verificationUrl}}", url)
    );
    await sendEmail(newUser.email, "Verify Email", inlinedHtml);

    res.status(200).json({
      status: "success",
      data: [user_data],
      message: "Please verify email.",
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

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message:
          "Invalid email or password. Please try again with the correct credentials.",
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
      token, // Return the token in the response body
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: err.message || "Internal Server Error",
    });
  }
  res.end();
};

exports.Logout = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(204);
    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });

    if (checkIfBlacklisted) return res.sendStatus(204);

    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();

    res.setHeader("Clear-Site-Data", '"cookies"');
    res.status(200).json({ message: "You are logged out!" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
};

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

    res.redirect("http://localhost:5173/verified");
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User with this email does not exist.",
      });
    }

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `http://localhost:8080/auth/users/${user._id}/reset-password/${token.token}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Click the following link to reset your password: ${url}`
    );

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

const verifiedemail = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * {
    margin: auto; 
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.Formail-page{
    background-color: #FEEFAD;
    height: 100vh;
    max-width: 640px;
}

.mail-head{
    background-color: #03AED2;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mail-head h1{
    font-size: 36px;
    color: white;
    font-weight: semi-bold;
}

.mail-body{
    background-color: white;
    max-width: 540px;
    margin-top: 50px;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 3px 3px 5px #00000025;
}

.content h2{
    font-size: 28px;
    color: #03AED2;
    font-weight: semi-bold;
    text-align: center;
    margin-bottom: 25px;
}

.content p{
    color: #03AED2;
    margin-bottom: 25px;
}

.btn-submit{
    max-width: fit-content;
    padding: 10px 15px;
    background-color: #68D2E8;
    border-radius: 50px;
}

.btn-submit a{
    font-size: 18px;
    color: white;
    font-weight: semi-bold;
}
  </style>
</head>
<body>
<div style="background-color: #FEEFAD; height: 100vh; max-width: 640px;">
    <div style="background-color: #03AED2; height: 150px; display: flex; justify-content: center; align-items: center;">
      <h1 style="font-size: 36px; color: white; font-weight: 600;">Welcome to User's Playground</h1>
    </div>
    <div style="background-color: white; max-width: 540px; margin-top: 50px; padding: 50px; border-radius: 20px; box-shadow: 3px 3px 5px #00000025;">
      <div class="content">
        <h2 style="font-size: 28px; color: #03AED2; font-weight: 600; text-align: center; margin-bottom: 25px;">Email Verification</h2>
        <p style="color: #03AED2; margin-bottom: 25px;">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
      </div>
      <div style="max-width: fit-content; padding: 10px 15px; background-color: #68D2E8; border-radius: 50px;">
        <a href="{{verificationUrl}}" style="font-size: 18px; color: white; font-weight: 600;">Verify Email</a>
      </div>
    </div>
  </div>
  </body>
  </html>
`;

const tokenemail = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * {
    margin: auto; 
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.Formail-page{
    background-color: #FEEFAD;
    height: 100vh;
    max-width: 640px;
}

.mail-head{
    background-color: #03AED2;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mail-head h1{
    font-size: 36px;
    color: white;
    font-weight: semi-bold;
}

.mail-body{
    background-color: white;
    max-width: 540px;
    margin-top: 50px;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 3px 3px 5px #00000025;
}

.content h2{
    font-size: 28px;
    color: #03AED2;
    font-weight: semi-bold;
    text-align: center;
    margin-bottom: 25px;
}

.content p{
    color: #03AED2;
    margin-bottom: 25px;
}

.btn-submit{
    max-width: fit-content;
    padding: 10px 15px;
    background-color: #68D2E8;
    border-radius: 50px;
}

.btn-submit a{
    font-size: 18px;
    color: white;
    font-weight: semi-bold;
}
  </style>
</head>
<body>
<div style="background-color: #FEEFAD; height: 100vh; max-width: 640px;">
    <div style="background-color: #03AED2; height: 150px; display: flex; justify-content: center; align-items: center;">
      <h1 style="font-size: 36px; color: white; font-weight: 600;">Welcome to User's Playground</h1>
    </div>
    <div style="background-color: white; max-width: 540px; margin-top: 50px; padding: 50px; border-radius: 20px; box-shadow: 3px 3px 5px #00000025;">
      <div class="content">
        <h2 style="font-size: 28px; color: #03AED2; font-weight: 600; text-align: center; margin-bottom: 25px;">Email Verification</h2>
        <p style="color: #03AED2; margin-bottom: 25px;">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
      </div>
      <div style="max-width: fit-content; padding: 10px 15px; background-color: #68D2E8; border-radius: 50px;">
        <a href="{{verificationUrl}}" style="font-size: 18px; color: white; font-weight: 600;">Verify Email</a>
      </div>
    </div>
  </div>
  </body>
  </html>
`;
