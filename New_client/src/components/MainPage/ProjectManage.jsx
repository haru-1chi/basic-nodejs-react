import React from 'react';
import ToolPanel from './LeftPanel';
import ProjectPanel from './RightPanel';

const ProjectManage = () => {
  return (
    <div className="project-manage-page w-full flex">
      <ToolPanel />
      <ProjectPanel />
    </div>
  );
};

export default ProjectManage;