import React, { useState, useEffect } from 'react';
import ProjectMembers from './ProjectMembers';
import { fetchProjectMembers } from '../api';
const ProjectDetails = ({ project, onExpand }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await fetchProjectMembers(project.id || project._id);
        setMembers(membersResponse.data.team_members);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [project.id, project._id]);

  return (
    <div onClick={onExpand}>
      <h3 className="project-title mb-4 text-2xl text-[#03AED2]">{project.name}</h3>
      <div className='grid grid-cols-2'>
        <div>
          <p className="project-dates text-[#03AED2] mb-4">During : {new Date(project.since_date).toLocaleDateString('en-GB')} - {new Date(project.due_date).toLocaleDateString('en-GB')}</p>
        </div>
        <ProjectMembers members={members} />
      </div>
      <p className="project-description text-[#03AED2]">{project.description}</p>
    </div>
  )

};

export default ProjectDetails;