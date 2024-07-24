import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../api';
import ProjectCard from './ProjectCard';
import CreateProject from './CreateProject';

const ProjectPanel = () => {
  const [projects, setProjects] = useState([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError("Error fetching projects");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setShowNewProjectForm(false);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        (project.id || project._id) === (updatedProject.id || updatedProject._id) ? updatedProject : project
      )
    );
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => (project.id || project._id) !== projectId)
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
          <ProjectCard key={project.id || project._id} project={project} onUpdateProject={handleUpdateProject} onDeleteProject={handleDeleteProject} />
        ))}
      </div>
      {error && <div className="error-message text-red-500">{error}</div>}
    </div>
  );
};

export default ProjectPanel;
