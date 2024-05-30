const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB')
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

const User = mongoose.model("users", userSchema)

module.exports = User

module.exports.SaveUser = async function (model, data) {
    try {
        await model.save(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};