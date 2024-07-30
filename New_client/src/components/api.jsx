import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

//-------------------------------------------------------------------
//Auth

export const registerUser = async (formData) => {
  try {
    const res = await api.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    console.error("Error registering user", err);
    throw err;
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await api.post('/auth/login', formData);
    return res.data;
  } catch (err) {
    console.error("Error logging in user", err);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.get('/auth/logout', {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("Error logging out user", err);
    throw err;
  }
};

export const sendResetPasswordEmail = async (formData) => {
  try {
    return res = await api.post(`/auth/forgetpassword`, formData, {
      headers: getAuthHeaders()
    });
  } catch (err) {
    console.error("Error sending reset password email", err);
    throw err;
  }
};

export const resetPassword = async (token, formData) => {
  try {
    return res = await api.post(`/auth/users/${token}/reset-password`, formData);
  } catch (err) {
    console.error("Error resetting password", err);
    throw err;
  }
};

//-------------------------------------------------------------------
//User Profile

export const fetchUserData = async () => {
  try {
    const res = await api.get("/user/profile", {
      headers: getAuthHeaders(),
    });
    return res.data.data;
  } catch (err) {
    console.error("Error fetching user data", err);
    throw err;
  }
};

export const updateUserData = async (formData) => {
  try {
    const res = await api.post("/user/updateprofile", formData, {
      headers: getAuthHeaders(),
    });
    return res.data.data;
  } catch (err) {
    console.error("Error updating user data", err);
    throw err;
  }
};

//-------------------------------------------------------------------
//Manage Project

export const fetchProjects = async () => {
  try {
    const res = await api.get(`/user/getlistproject`, {
      headers: getAuthHeaders(),
    });
    return res.data || [];
  } catch (err) {
    console.error("Error fetching projects", err);
    throw err;
  }
};

export const createProjects = async (newProject) => {
  try {
    const res = await api.post(`/user/newproject`, newProject, {
      headers: getAuthHeaders(),
    });
    return res.data.savedProject;
  } catch (err) {
    console.error("Error creating project", err);
    throw err;
  }
};

export const updateProjects = async (ProjectId, ProjectData ) => {
  try {
    const res = await api.put(`/user/project/${ProjectId}`, ProjectData, {
      headers: getAuthHeaders(),
    });
    return res.data.data;
  } catch (err) {
    console.error("Error creating project", err);
    throw err;
  }
};

export const deleteProjects = async (projectId) => {
  try {
    return await api.delete(`/user/project/${projectId}`, {
      headers: getAuthHeaders(),
    });
  } catch (err) {
    console.error(`Error deleting project ${projectId}`, err);
    throw err;
  }
};

//Project Members

export const fetchProjectMembers = async (projectId) => {
  try {
    return await api.get(`/user/getdetailproject/${projectId}`, {
      headers: getAuthHeaders(),
    });
  } catch (err) {
    console.error(`Error fetching project members for project ${projectId}`, err);
    throw err;
  }
};

export const fetchAccessTypes = async () => {
  try {
    return await api.get("/user/getaccess", {
      headers: getAuthHeaders(),
    });
  } catch (err) {
    console.error("Error fetching access types", err);
    throw err;
  }
};

export const addProjectMember = async (projectId, memberData) => {
  try {
    const res = await api.post(`/user/project/${projectId}/addMember`, memberData, {
      headers: getAuthHeaders(),
    });
    return res.data.data;
  } catch (err) {
    console.error(`Error adding member to project ${projectId}`, err);
    throw err;
  }
};

export const searchMember = async (query) => {
  try {
    const res = await api.get(`/user/search?query=${query}`, {
      headers: getAuthHeaders(),
    });
    return res.data.users;
  } catch (err) {
    console.error(`Error adding member to project ${projectId}`, err);
    throw err;
  }
};


//api.jsx
// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
//   withCredentials: true,
// });

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return { Authorization: `Bearer ${token}` };
// };

// const handleResponse = (response) => response.data;

// const handleError = (error) => {
//   console.error(error.response?.data || error.message);
//   throw new Error(error.response?.data?.message || 'An error occurred');
// };

// export const fetchProjectMembers = (projectId) =>
//   api
//     .get(`/user/getdetailproject/${projectId}`, { headers: getAuthHeaders() })
//     .then(handleResponse)
//     .catch(handleError);

// export const fetchAccessTypes = () =>
//   api
//     .get('/user/getaccess', { headers: getAuthHeaders() })
//     .then(handleResponse)
//     .catch(handleError);

// export const fetchProjects = async () =>
//   api
//     .get('/user/getlistproject', { headers: getAuthHeaders() })
//     .then(handleResponse)
//     .catch(handleError);

// export const registerUser = async (formData) =>
//   api
//     .post('/auth/register', formData)
//     .then(handleResponse)
//     .catch(handleError);

// export const fetchUserData = async () =>
//   api
//     .get('/user/profile', { headers: getAuthHeaders() })
//     .then(handleResponse)
//     .catch(handleError);

// export const updateUserData = async (formData) =>
//   api
//     .post('/user/updateprofile', formData, { headers: getAuthHeaders() })
//     .then(handleResponse)
//     .catch(handleError);
