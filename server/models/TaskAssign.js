const mongoose = require("mongoose");
const TaskAssignSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "positions",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("taskAssigns", TaskAssignSchema);
