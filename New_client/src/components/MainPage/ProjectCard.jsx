import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const ProjectCard = ({ project, onUpdateProject, onDeleteProject }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState({
    _id: project.id,
    name: project.name,
    description: project.description,
    since_date: project.since_date ? new Date(project.since_date).toISOString().split('T')[0] : '',
    due_date: project.due_date ? new Date(project.due_date).toISOString().split('T')[0] : ''
  });

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditProject({ ...editProject, [e.target.name]: e.target.value });
  };

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8080/user/project/${(project.id || project._id)}`, editProject, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      onUpdateProject(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/user/project/${(project.id || project._id)}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
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
        <div onClick={handleExpand} className="grid grid-cols-2 place-items-start mb-6">
          <h3 className="project-title text-2xl text-[#03AED2]">{project.name}</h3>
          <div>
            <p className="project-dates text-[#03AED2] mb-4">During : {formatDateToDDMMYYYY(new Date(project.since_date).toISOString().split('T')[0])} - {formatDateToDDMMYYYY(new Date(project.due_date).toISOString().split('T')[0])}</p>
            <p className="project-team text-[#03AED2]">Created by : {project.create_by}</p>
          </div>

        </div>
        <p className="project-description text-[#03AED2]">{project.description}</p>
      </div>
      {expanded && (
        <div className="expanded-content mt-4">
          <button className="add-task-button bg-[#03AED2] text-white py-1 px-2 rounded-full">+ Add task</button>
          <div className="task-card bg-white dark:bg-[#3D2C8D] p-4 rounded-lg shadow-md mt-4">
            <div className='flex justify-between'>
              <h4 className="task-title text-lg text-[#03AED2]">Task: Title</h4>
              <div className="flex">
                <h2 className='text-xl text-[#03AED2] mr-5'><FaEdit /></h2>
                <h2 className='text-xl text-[#03AED2]'><FaTrashAlt /></h2>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <p className="task-dates text-[#03AED2]">Due date</p>
              <p className="task-assign text-[#03AED2]">Assigned to</p>
            </div>
            <p className="task-description text-[#03AED2]">description</p>
          </div>
        </div>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} className="edit-project-form mt-4">
          <input
            type="hidden"
            name="id"
            value={editProject._id}
            onChange={handleChange}
            className=""
            required
          />
          <input
            type="text"
            name="name"
            value={editProject.name}
            onChange={handleChange}
            placeholder="Project Title"
            className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
            required
          />
          <div className="flex mt-2">
            <input
              type="date"
              name="since_date"
              value={editProject.since_date}
              onChange={handleChange}
              className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
              required
            />
            <input
              type="date"
              name="due_date"
              value={editProject.due_date}
              onChange={handleChange}
              className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
              required
            />
          </div>
          <textarea
            name="description"
            value={editProject.description}
            onChange={handleChange}
            placeholder="Project Description"
            className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-xl w-full text-xl text-[#03AED2] dark:text-[#C996CC] mt-2"
            required
          />
          <div className='flex justify-end mt-2'>
            <button type="submit" className="submit-button bg-[#03AED2] text-white py-2 px-4 rounded-full">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectCard;
