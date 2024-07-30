import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { fetchProjectMembers, fetchAccessTypes, deleteProjects } from '../api';

import EditProjectForm from './EditProjectForm';
import ProjectDetails from './ProjectDetails';

const ProjectCard = ({ project, onUpdateProject, onDeleteProject }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [members, setMembers] = useState([]);
  const [accessTypes, setAccessTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await fetchProjectMembers(project.id || project._id);
        setMembers(membersResponse.data.team_members);
        const accessTypesResponse = await fetchAccessTypes();
        setAccessTypes(accessTypesResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [project.id, project._id]);

  const handleExpand = () => setExpanded((prevExpanded) => !prevExpanded);

  const handleEditToggle = () => setIsEditing((prevIsEditing) => !prevIsEditing);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProjects(project.id || project._id)
        onDeleteProject(project.id || project._id);
        setExpanded(false);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div className="project-card bg-white dark:bg-[#3D2C8D] px-4 pt-2 pb-4 rounded-lg shadow-md mb-4">
      <div className="cursor-pointer">
        <div className='flex justify-end'>
          <h2 className='text-m text-[#03AED2] mr-2' onClick={handleEditToggle}><FaEdit /></h2>
          <h2 className='text-m text-[#03AED2]' onClick={handleDelete}><FaTrashAlt /></h2>
        </div>
        {isEditing ? (
          <EditProjectForm
            project={project}
            members={members}
            accessTypes={accessTypes}
            onUpdateProject={onUpdateProject}
            setIsEditing={setIsEditing}
          />

        ) : (
          <>
            <ProjectDetails project={project} onExpand={handleExpand} />
          </>
        )}
      </div>
      {expanded && (
        <div className="expanded-content mt-4">
          <button className="add-task-button bg-[#03AED2] text-white py-1 px-2 rounded-full">+ Add task</button>
          {/* Add task component here */}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
