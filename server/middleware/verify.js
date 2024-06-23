const User = require("../models/User");
const Profile = require("../models/Profile");
const Blacklist = require('../models/Blacklist');
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.Verify = async (req, res, next) => {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(401);
    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];

    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
    if (checkIfBlacklisted) {
        return res.status(401).json({ message: "This session has expired. Please login" });
    }

    jwt.verify(accessToken, config.SECRET_ACCESS_TOKEN, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "This session has expired. Please login" });
        }

        const { id } = decoded;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...data } = user._doc;
        req.user = data;
        next();
    });
}

exports.VerifyRole = async (req, res, next) => {
    try {
        const user = req.user;
        const profile = await Profile.findOne({ userId: user._id });
        if (!profile) {
            return res.status(404).json({
                status: "failed",
                message: "Profile not found.",
            });
        }
        
        const { role } = profile;
        if (role !== "admin") {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next();
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,

            message: err.message || "Internal Server Error",
        });
    }
}