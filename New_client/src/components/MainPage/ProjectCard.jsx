import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="project-card bg-white dark:bg-[#3D2C8D] px-4 pt-2 pb-4 rounded-lg shadow-md mb-4">
      <div onClick={handleExpand} className="cursor-pointer">
        <div className='flex justify-end'>
          <h2 className='text-m text-[#03AED2] mr-2'><FaEdit /></h2>
          <h2 className='text-m text-[#03AED2]'><FaTrashAlt /></h2>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="project-title text-xl text-[#03AED2]">{project.name}</h3>
          <p className="project-dates text-[#03AED2]">Start - End Date</p>
        </div>
        <p className="project-description text-[#03AED2]">{project.description}</p>
      </div>
      {expanded && (
        <div className="expanded-content mt-4">
          <p className="project-team text-[#03AED2]">Created by: {project.create_by}</p>
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
    </div>
  );
};

export default ProjectCard;
