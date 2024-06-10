const User = require('../models/User');
const Profile = require('../models/Profile');

// Get list of all users
exports.getListUser = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude the password field
        const profiles = await Profile.find();
        
        // Combine user and profile data based on userId
        const userList = users.map(user => {
            const profile = profiles.find(p => p.userId.toString() === user._id.toString());
            return {
                profile: profile ? {
                    _id: profile._id,
                    userId: profile.userId,
                    username: user.username,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                } : null
            };
        });
        res.status(200).json({
            status: 'success',
            data: userList
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Internal Server Error',
        });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'User not found.'
            });
        }

        // Also delete the user's profile
        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) {
            return res.status(404).json({
                status: 'failed',
                message: 'Profile not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully.'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Internal Server Error'
        });
    }
};
