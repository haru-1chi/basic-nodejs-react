const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
    const userId = req.user._id;

    try {
        const profile = await getProfileWithFields(userId);
        
        if (!profile) {
            return res.status(404).json({
                status: "failed",
                message: "Profile not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: profile
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.user._id;
    const { first_name, last_name, birthday, tel, role } = req.body;

    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId },
            { first_name, last_name, birthday, tel, role },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({
                status: "failed",
                message: "Profile not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: updatedProfile
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};

const getProfileWithFields = async (userId) => {
    try {
        const profile = await Profile.findOne({ userId })
            .populate({
                path: 'userId',
                select: '_id username email'
            })
            .select('_id first_name last_name birthday tel role');

        if (!profile) {
            throw new Error('Profile not found');
        }
        
        const result = {
            _id: profile._id,
            username: profile.userId.username,
            first_name: profile.first_name,
            last_name: profile.last_name,
            birthday: profile.birthday,
            tel: profile.tel,
            role: profile.role,
        };

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};