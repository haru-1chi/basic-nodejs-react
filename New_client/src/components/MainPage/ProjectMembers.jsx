import React from 'react';

const ProjectMembers = ({ members }) => (
  <div>
    <h4 className="project-team text-[#03AED2] mb-4">Team Members</h4>
    <ul>
      {members.map((member) => (
        <li key={member.profileID} className='text-[#03AED2]'>{member.first_name} {member.last_name} - {member.position}</li>
      ))}
    </ul>
  </div>
);

export default ProjectMembers;