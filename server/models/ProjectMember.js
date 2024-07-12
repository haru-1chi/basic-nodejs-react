const mongoose = require("mongoose");
const ProjectMemberSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    positionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "positions",
      required: false,
      default: null,
    },
    accessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accesses",
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projectMembers", ProjectMemberSchema);
