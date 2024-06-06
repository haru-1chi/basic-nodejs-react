const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB')
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
  });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
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