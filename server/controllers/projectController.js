const Project = require("../models/Project");
const ProjectMember = require("../models/ProjectMember");
const Profile = require("../models/Profile");
const Access = require("../models/Access");
const Task = require("../models/Task");
const TaskAssign = require("../models/TaskAssign");

const createErrorResponse = (res, status, message) => {
  res.status(status).json({
    status: "error",
    message,
  });
};
//แก้ชื่อตัวแปรจาก parameter id => Id
exports.createProject = async (req, res) => {
  const { name, description, since_date, due_date } = req.body;
  const userId = req.user._id;

  try {
    const profile = await Profile.findOne({ userId }).select("_id");
    if (!profile) {
      return createErrorResponse(res, 404, "Profile not found");
    }
    const profileId = profile._id;

    const newProject = new Project({ name, description, since_date, due_date }); //เพิ่ม validate, เช็คการกำหนด timeline of project
    const savedProject = await newProject.save();

    const newProjectMember = new ProjectMember({
      projectId: savedProject._id,
      profileId,
      position: "Leader",
      accessId: "6692131dbad9b54854dcb58b",
    });
    await newProjectMember.save();

    res.status(201).json({
      status: "success",
      message: "Project created successfully",
      savedProject,
      newProjectMember,
    });
  } catch (err) {
    createErrorResponse(res, 500, err.message || "Internal Server Error");
  }
};

exports.getListProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId }).select("_id");
    if (!profile) {
      return createErrorResponse(res, 404, "Profile not found");
    }
    const profileId = profile._id;

    const userProjects = await ProjectMember.find({ profileId }).lean();
    if (!userProjects.length) {
      return res.status(200).json([]);
    }

    const projectIds = userProjects.map((pm) => pm.projectId);
    const projects = await Project.find({ _id: { $in: projectIds } })
      .sort({ updatedAt: -1 })
      .lean();

    const projectList = await Promise.all(
      projects.map(async (project) => {
        const projectOwner = await ProjectMember.findOne({
          projectId: project._id,
          accessId: "6692131dbad9b54854dcb58b",
        }).populate("profileId", "first_name last_name");

        let createBy = "Unknown";
        if (projectOwner && projectOwner.profileId) {
          createBy = `${projectOwner.profileId.first_name} ${projectOwner.profileId.last_name}`;
        }

        return {
          id: project._id,
          name: project.name,
          description: project.description,
          since_date: project.since_date,
          due_date: project.due_date,
          create_by: createBy,
        };
      })
    );
    res.status(200).json(projectList);
  } catch (error) {
    createErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

exports.getDetailProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).lean();
    if (!project) {
      return createErrorResponse(res, 404, "Project not found");
    }

    const projectMembers = await ProjectMember.find({ projectId: project._id })
      .populate("profileId", "first_name last_name")
      .populate("accessId", "name")
      .lean();

    const teamMembers = await Promise.all(
      projectMembers.map(async (member) => {
        const profile = await Profile.findOne({ _id: member.profileId }).select(
          "first_name last_name"
        );

        return {
          profileID: profile ? profile._id : null,
          first_name: profile ? profile.first_name : "Unknown",
          last_name: profile ? profile.last_name : "Unknown",
          position: member.position || "Unknown",
          access: member.accessId ? member.accessId.name : "Unknown",
        };
      })
    );

    const projectDetails = {
      id: project._id,
      name: project.name,
      description: project.description,
      since_date: project.since_date,
      due_date: project.due_date,
      team_members: teamMembers,
    };

    res.status(200).json(projectDetails);
  } catch (error) {
    createErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, since_date, due_date } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description, since_date, due_date },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return createErrorResponse(res, 404, "Project not found");
    }

    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    createErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return createErrorResponse(res, 404, "Project not found");
    }

    await ProjectMember.deleteMany({ projectId: projectId });
    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      status: "success",
      message: "Project and related members deleted successfully",
    });
  } catch (error) {
    createErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

exports.addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { profileId, position, accessId } = req.body;

    if (!profileId || !position || !accessId) {
      return createErrorResponse(res, 400, "All fields are required");
    }
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return createErrorResponse(res, 404, "Profile not found");
    }
    const access = await Access.findById(accessId);

    if (!access) {
      return createErrorResponse(res, 404, "Access type not found");
    }

    const existingMember = await ProjectMember.findOne({
      projectId,
      profileId,
    });
    if (existingMember) {
      return createErrorResponse(res, 400, "User is already a member of this project");
    }

    const newMember = new ProjectMember({
      projectId,
      profileId,
      position,
      accessId,
    });

    await newMember.save();

    res.status(201).json({
      status: "success",
      message: "Member added successfully",
      data: {
        id: newMember._id,
        projectId: newMember.projectId,
        profileId: newMember.profileId,
        position: newMember.position,
        accessId: newMember.accessId,
      },
    });
  } catch (error) {
    createErrorResponse(res, 500, error.message || "Internal Server Error");
  }
};

//--------------------------------------------------
exports.createTask = async (req, res) => {
  try {
    const { projectId, name, description, due_date, profileId } = req.body;

    // Validate input
    if (!projectId || !name) {
      return res.status(400).json({
        status: "error",
        message: "Project ID, Task name, and Profile ID are required",
      });
    }

    // Check if the profile exists
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    // Create a new task
    const newTask = new Task({
      projectId,
      name,
      description,
      due_date,
    });

    await newTask.save();

    // Assign the task to the profile
    const newTaskAssign = new TaskAssign({
      taskId: newTask._id,
      profileId,
      projectId,
    });

    await newTaskAssign.save();

    res.status(201).json({
      status: "success",
      message: "Task created and assigned successfully",
      data: {
        taskId: newTask._id,
        projectId: newTask.projectId,
        name: newTask.name,
        description: newTask.description,
        due_date: newTask.due_date,
        assigned_to: profile.first_name + " " + profile.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
