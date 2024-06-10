const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    birthday: { type: Date
    },
    tel: { type: String
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("profiles", ProfileSchema);
