import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
const ProjectPanel = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const handleExpand = (projectId) => {
    setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
  };

  return (
    <div className="project-panel w-4/5 p-4 dark:bg-[#1C0C5B]">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#03AED2]">Projects</h2>
        <button className="new-project-button bg-[#03AED2] text-white py-2 px-4 rounded-full">+ New Project</button>
      </div>
      <div className="project-list">
        {[1, 2].map((projectId) => (
          <div key={projectId} className="project-card bg-white dark:bg-[#3D2C8D] p-4 rounded-lg shadow-md mb-4">
            <div onClick={() => handleExpand(projectId)} className="cursor-pointer">
              <div className="flex justify-between">
                <h3 className="project-title text-xl text-[#03AED2]">Project: Title {projectId}</h3>
                <p className="project-dates text-[#03AED2]">Start - End Date</p>
                <div className='flex'>
                  <h2 className='text-xl text-[#03AED2] mr-5'><FaEdit /></h2>
                  <h2 className='text-xl text-[#03AED2]'><FaTrashAlt /></h2>
                </div>
              </div>
              <p className="project-description text-[#03AED2]">description</p>
            </div>
            {expandedProjectId === projectId && (
              <div className="expanded-content mt-4">
                <p className="project-team text-[#03AED2]">Team member</p>
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
                    <p className="task-assign text-[#03AED2]">assign to</p>

                  </div>
                  <p className="task-description text-[#03AED2]">description</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPanel;