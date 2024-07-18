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

const router = express.Router();

router.get("/profile", Verify, getProfile);
router.post("/updateprofile", Verify, updateProfile);
router.post("/newproject", Verify, createProject);
router.get("/user/getlistproject", Verify, getListProject);
router.get("/user/getdetailproject/:projectId", Verify, getDetailProject);
router.post("/project/:projectId/addMember", Verify, addMember);
router.put("/user/project/:projectid", Verify, updateProject);
router.delete("/user/project/:projectid", Verify, deleteProject);
module.exports = router;
