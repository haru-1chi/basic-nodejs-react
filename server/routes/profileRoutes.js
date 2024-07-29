const express = require("express");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");
const {
  createProject,
  addMember,
  getListProject,
  getDetailProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { Verify } = require("../middleware/verify");
const Profile = require("../models/Profile");
const Access = require("../models/Access");
const router = express.Router();

router.use(Verify);

router.get("/profile", getProfile);
router.post("/updateprofile", updateProfile);
router.post("/newproject", createProject);
router.get("/getlistproject", getListProject);
router.get("/getdetailproject/:projectId", getDetailProject);
router.post("/project/:projectId/addMember", addMember);
router.put("/project/:projectId", Verify, updateProject); //
router.delete("/project/:projectId", Verify, deleteProject); //

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ status: "error", message: "Query parameter is required" });
    }

    const sanitizedQuery = query.replace(/[^a-zA-Z0-9 ]/g, "");

    const users = await Profile.find({
      $or: [{ first_name: new RegExp('^' + sanitizedQuery, 'i') }],
    }).select("first_name last_name");

    res.status(200).json({ status: "success", users });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: error.message || "Internal Server Error",
      });
  }
});

router.get("/getaccess", async (req, res) => {
  try {
    const accessTypes = await Access.find();
    res.status(200).json({
      status: "success",
      data: accessTypes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
});

module.exports = router;
