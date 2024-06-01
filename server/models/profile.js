const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB')
}

const profileSchema = new mongoose.Schema({
    name: { type: String},
    birthDay: { type: String},
    picture: { type: String}
})

const Profile = mongoose.model("profiles", profileSchema)

module.exports = Profile

module.exports.SaveProfile = async function (model, data) {
    try {
        await model.save(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};