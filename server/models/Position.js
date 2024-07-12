const mongoose = require("mongoose");
const PositionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "none",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("positions", PositionSchema);
