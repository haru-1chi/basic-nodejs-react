const User = require("../models/User");
const Profile = require("../models/Profile");

exports.getListUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index of the documents to be fetched
    const startIndex = (page - 1) * limit;

    // Fetch the total number of documents in the User collection
    const totalUsers = await User.countDocuments();

    const users = await User.find()
      .select("-password")
      .skip(startIndex)
      .limit(limit);

    const profiles = await Profile.find();

    const userList = users.map((user) => {
      const profile = profiles.find(
        (p) => p.userId.toString() === user._id.toString()
      );
      return {
        profile: profile
          ? {
              _id: profile._id,
              userId: profile.userId,
              username: user.username,
              first_name: profile.first_name,
              last_name: profile.last_name,
            }
          : null,
      };
    });

    res.status(200).json({
      status: "success",
      data: userList,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers: totalUsers,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found.",
      });
    }

    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({
        status: "failed",
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};
