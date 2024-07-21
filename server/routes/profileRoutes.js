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
const Profile = require('../models/Profile');
const Access = require('../models/Access');
const router = express.Router();

router.get("/profile", Verify, getProfile);
router.post("/updateprofile", Verify, updateProfile);
router.post("/newproject", Verify, createProject);
router.get("/user/getlistproject", Verify, getListProject);
router.get("/user/getdetailproject/:projectId", Verify, getDetailProject);
router.post("/project/:projectId/addMember", Verify, addMember);
router.put("/user/project/:projectid", Verify, updateProject);
router.delete("/user/project/:projectid", Verify, deleteProject);

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ status: 'error', message: 'Query parameter is required' });
    }

    // Search for users where first_name or last_name starts with the query
    const users = await Profile.find({
      $or: [
        { first_name: new RegExp('^' + query, 'i') }
      ]
    }).select('first_name last_name');

    res.status(200).json({ status: 'success', users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Internal Server Error' });
  }
});

router.get('/getaccess', async (req, res) => {
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
