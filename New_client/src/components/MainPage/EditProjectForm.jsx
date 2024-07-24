import React, { useState } from 'react';
import axios from 'axios';

const EditProjectForm = ({ project, members, accessTypes, onUpdateProject, setIsEditing }) => {
  const [editProject, setEditProject] = useState({
    _id: project.id || project._id,
    name: project.name,
    description: project.description,
    since_date: project.since_date ? new Date(project.since_date).toISOString().split('T')[0] : '',
    due_date: project.due_date ? new Date(project.due_date).toISOString().split('T')[0] : ''
  });
  
  const [newMember, setNewMember] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedAccessId, setSelectedAccessId] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prevEditProject) => ({ ...prevEditProject, [name]: value }));
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (selectedProfileId && selectedPosition && selectedAccessId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8080/user/project/${(project.id || project._id)}/addMember`, {
          profileId: selectedProfileId,
          position: selectedPosition,
          accessId: selectedAccessId,
        }, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        onUpdateProject(response.data.data);
        setNewMember('');
        setSelectedProfileId('');
        setSelectedPosition('');
        setSelectedAccessId('');
        setSearchResults([]);
        setIsEditing(false);
      } catch (error) {
        console.error('Error adding member:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8080/user/project/${(editProject._id)}`, editProject, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      onUpdateProject(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setNewMember(query);
    if (query.length > 0) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/user/search?query=${query}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setSearchResults(response.data.users);
      } catch (error) {
        console.error('Error searching for users:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectUser = (user) => {
    setNewMember(`${user.first_name} ${user.last_name}`);
    setSelectedProfileId(user._id);
    setSearchResults([]);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-project-form">
      <div className="place-items-start">
        <input
          type="hidden"
          name="id"
          value={editProject._id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          value={editProject.name}
          onChange={handleChange}
          placeholder="Project Title"
          className="input-field p-1 pl-3 mb-4 border border-[#68D2E8] dark:border-[#C996CC] rounded-full max-w-lg text-xl text-[#03AED2] dark:text-[#C996CC]"
          required
        />
        <div className='grid grid-cols-2 mb-4'>
          <div className='place-items-start mt-8'>
            <label className='text-white'>During : </label>
            <input
              type="date"
              name="since_date"
              value={editProject.since_date}
              onChange={handleChange}
              className="input-field ml-4 p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full max-w-lg text-xl text-[#03AED2] dark:text-[#C996CC]"
              required
            />
            <label className='ml-4 text-white'> - </label>
            <input
              type="date"
              name="due_date"
              value={editProject.due_date}
              onChange={handleChange}
              className="input-field ml-6 p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full max-w-lg text-xl text-[#03AED2] dark:text-[#C996CC]"
              required
            />
          </div>
          <div className='place-items-start'>
            <p className='text-white'>Add Team member</p>
            <div className='grid grid-cols-8 gap-2'>
              <input
                type="text"
                value={newMember}
                onChange={handleSearchChange}
                placeholder="Add new member"
                className="input-field col-span-3 mt-2 p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full max-w-lg text-xl text-[#03AED2] dark:text-[#C996CC]"
              />
              <input
                type="text"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                placeholder="Position"
                className="input-field col-span-2 mt-2 p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full max-w-lg text-xl text-[#03AED2] dark:text-[#C996CC]"
              />
              <select
                value={selectedAccessId}
                onChange={(e) => setSelectedAccessId(e.target.value)}
                className="input-field col-span-2 mt-2 p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full max-w-lg text-xl text-[#03AED2] dark:text-[#C996CC]"
              >
                <option value="" disabled>Access</option>
                {accessTypes.map((access) => (
                  <option key={access._id} value={access._id}>{access.name}</option>
                ))}
              </select>
              <button type="button" onClick={handleAddMember} className="bg-[#03AED2] text-white py-1 px-2 rounded-full mt-2">Add</button>
              <ul className='col-span-3'>
                {searchResults.map((user, index) => (
                  <li key={index} className=' text-white' onClick={() => handleSelectUser(user)}>{user.first_name} {user.last_name}</li>
                ))}
              </ul>
            </div>
            <p className='text-white mt-2'>Team member</p>
            <ul>
              {members.map((member, index) => (
                <li key={index} className='text-white'>- {member.first_name} {member.last_name}</li>
              ))}
            </ul>
          </div>
        </div>

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
  );
}
export default EditProjectForm;