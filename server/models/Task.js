const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    due_date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", TaskSchema);
