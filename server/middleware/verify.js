const User = require("../models/User");
const Profile = require("../models/Profile");
const Blacklist = require('../models/Blacklist');
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.Verify = async (req, res, next) => {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header

    if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
    const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted

    // if true, send an unauthorized message, asking for re-authentication.
    if (checkIfBlacklisted) {
        return res.status(401).json({ message: "This session has expired. Please login" });
    }

    // if token has not been blacklisted, verify with jwt to see if it has been tampered with or not.
    // that's like checking the integrity of the accessToken
    jwt.verify(accessToken, config.SECRET_ACCESS_TOKEN, async (err, decoded) => {
        if (err) {
            // if token has been altered, return a forbidden error
            return res.status(401).json({ message: "This session has expired. Please login" });
        }

        const { id } = decoded; // get user id from the decoded token
        const user = await User.findById(id); // find user by that `id`
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...data } = user._doc; // return user object without the password
        req.user = data; // put the data object into req.user
        next();
    });
}

exports.VerifyRole = async (req, res, next) => {
    try {
        const user = req.user; // we have access to the user object from the request
        const profile = await Profile.findOne({ userId: user._id }); // fetch the profile using the userId
        if (!profile) {
            return res.status(404).json({
                status: "failed",
                message: "Profile not found.",
            });
        }
        
        const { role } = profile; // extract the user role
        // check if user has no advance privileges
        // return an unathorized response
        if (role !== "admin") {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,

            message: err.message || "Internal Server Error",
        });
    }
}