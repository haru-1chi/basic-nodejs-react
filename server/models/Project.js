const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    since_date: { type: Date },
    due_date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", ProjectSchema);
