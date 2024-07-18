const Project = require("../models/Project");
const ProjectMember = require("../models/ProjectMember");
const Profile = require("../models/Profile");
const Access = require("../models/Access");
const Task = require('../models/Task');
const TaskAssign = require('../models/TaskAssign');

exports.createProject = async (req, res) => {
  const { name, description, since_date, due_date } = req.body;
  const userId = req.user._id;
  const profileId = await Profile.findOne({ userId: userId }).select("_id");

  try {
    const newProject = new Project({ name, description, since_date, due_date });
    const savedProject = await newProject.save();

    const newProjectMember = new ProjectMember({
      projectId: savedProject._id,
      profileId,
      position: "leader",
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
    res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
};

exports.getListProject = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the profile ID of the current user
    const profile = await Profile.findOne({ userId }).select("_id");
    const profileId = profile._id;

    // Find all project memberships for the user
    const userProjects = await ProjectMember.find({ profileId }).lean();

    if (!userProjects.length) {
      return res.status(200).json([]);
    }

    // Extract project IDs
    const projectIds = userProjects.map((pm) => pm.projectId);

    // Find projects by these IDs and sort them by the latest updatedAt field
    const projects = await Project.find({ _id: { $in: projectIds } })
                                  .sort({ updatedAt: -1 })
                                  .lean();

    // Generate project list with owner details
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
          create_by: createBy,
        };
      })
    );

    res.status(200).json(projectList);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};


exports.getDetailProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project by its ID
    const project = await Project.findById(projectId).lean();
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Find the project members
    const projectMembers = await ProjectMember.find({ projectId: project._id })
      .populate("profileId", "first_name last_name")
      .populate("accessId", "name")
      .lean();

    // Construct the team member details
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

    // Construct the response object
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
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectid } = req.params;
    const { name, description, since_date, due_date } = req.body;

    // Find the project by ID
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Update project fields if they are provided in the request body
    if (name) project.name = name;
    if (description) project.description = description;
    if (since_date) project.since_date = new Date(since_date);
    if (due_date) project.due_date = new Date(due_date);

    // Save the updated project
    await project.save();

    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectid } = req.params;

    // Find the project by ID
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Delete related project member records
    await ProjectMember.deleteMany({ projectId: projectid });

    // Delete the project
    await Project.findByIdAndDelete(projectid);

    res.status(200).json({
      status: "success",
      message: "Project and related members deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { profileId, position, accessId } = req.body;

    // Validate input
    if (!profileId || !position || !accessId) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Find the profile
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    // Validate the access ID
    const access = await Access.findById(accessId);
    if (!access) {
      return res.status(404).json({
        status: "error",
        message: "Access type not found",
      });
    }

    // Check if the user is already a member of the project
    const existingMember = await ProjectMember.findOne({
      projectId,
      profileId,
    });
    if (existingMember) {
      return res.status(400).json({
        status: "error",
        message: "User is already a member of this project",
      });
    }

    // Create a new project member record
    const newMember = new ProjectMember({
      projectId,
      profileId,
      position: position,
      accessId,
    });

    await newMember.save();

    res.status(201).json({
      status: "success",
      message: "Member added successfully",
      data: {
        id: newMember._id,
        projectId: newMember.projectId,
        userId: newMember.userId,
        position: newMember.position,
        accessId: newMember.accessId,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
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