const mongoose = require("mongoose");
const AccessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "owner"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("accesses", AccessSchema);
