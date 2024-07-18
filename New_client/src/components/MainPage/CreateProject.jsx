import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const CreateProject = ({ onAddProject }) => {
  const [newProject, setNewProject] = useState({
    name: '',
    since_date: '',
    due_date: '',
    description: ''
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:8080/newproject', newProject, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const createdProject = response.data.savedProject;
      onAddProject(createdProject);
      setNewProject({
        name: '',
        since_date: '',
        due_date: '',
        description: ''
      });
    } catch (error) {
      console.error('Error creating new project:', error);
    }
  };

  return (
    <div className="new-project-form bg-white dark:bg-[#3D2C8D] px-4 pt-2 pb-4 rounded-lg shadow-md mb-4">
      <div className="cursor-pointer">
        <div className='flex justify-end mb-2'>
          <h2 className='text-m text-[#03AED2]'><FaTrashAlt /></h2>
        </div>
        <p className="project-description text-[#03AED2]"></p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 items-center mb-6">
          <input
            type="text"
            name="name"
            placeholder="Project Title"
            value={newProject.name}
            onChange={handleChange}
            className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
            required
          />
          <div className="flex">
            <input
              type="date"
              name="since_date"
              value={newProject.since_date}
              onChange={handleChange}
              className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
              required
            />
            <input
              type="date"
              name="due_date"
              value={newProject.due_date}
              onChange={handleChange}
              className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
              required
            />
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Project Description"
          value={newProject.description}
          onChange={handleChange}
          className="input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-xl w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
          required
        />
        <div className='flex justify-end'>
          <button type="submit" className="submit-button bg-[#03AED2] text-white py-2 px-4 rounded-full">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
