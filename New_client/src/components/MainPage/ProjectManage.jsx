import React from 'react';
import ToolPanel from './ToolPanel';
import ProjectPanel from './ProjectPanel';

const ProjectManage = () => {
  return (
    <div className="project-manage-page w-full flex">
      <ToolPanel />
      <ProjectPanel />
    </div>
  );
};

export default ProjectManage;
