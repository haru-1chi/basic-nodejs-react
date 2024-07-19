import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import CreateProject from './CreateProject';

const ProjectPanel = () => {
  const [projects, setProjects] = useState([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/user/getlistproject", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setProjects(res.data || []);
      } catch (err) {
        setError("Error fetching projects");
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = (newProject) => {
    setProjects((prevItem) => {
      return [newProject, ...prevItem]
    })
    setShowNewProjectForm(false);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
  };

  const handleShowFormToggle = () => {
    setShowNewProjectForm(!showNewProjectForm);
  };

  return (
    <div className="project-panel w-4/5 p-4 dark:bg-[#1C0C5B]">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#03AED2]">Projects</h2>
        <button
          onClick={handleShowFormToggle}
          className="new-project-button bg-[#03AED2] text-white py-2 px-4 rounded-full"
        >
          + New Project
        </button>
      </div>

      {showNewProjectForm && <CreateProject onAddProject={handleAddProject} />}

      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id || project._id} project={project} onUpdateProject={handleUpdateProject} />
        ))}
      </div>
      {error && <div className="error-message text-red-500">{error}</div>}
    </div>
  );
};

export default ProjectPanel;
