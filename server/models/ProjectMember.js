const mongoose = require("mongoose");
const ProjectMemberSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
      required: true,
    },
    position: {
      type: String,
      default: null,
    },
    accessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accesses",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projectMembers", ProjectMemberSchema);
