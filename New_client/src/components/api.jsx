import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const fetchProjectMembers = (projectId) => {
  return api.get(`/user/getdetailproject/${projectId}`, {
    headers: getAuthHeaders(),
  });
};

export const fetchAccessTypes = () => {
  return api.get(`/user/getaccess`, {
    headers: getAuthHeaders(),
  });
};

export const fetchProjects = async () => {
  try {
    const res = await api.get(`/user/getlistproject`, {
      headers: getAuthHeaders(),
    });
    return res.data || [];
  } catch (err) {
    throw new Error("Error fetching projects");
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await api.post('/auth/register', formData);
    return res.data;
  } catch (err) {
    throw new Error("Error registering user");
  }
};

export const fetchUserData = async () => {
  const res = await api.get("/user/profile");
  return res.data.data;
};

export const updateUserData = async (formData) => {
  const res = await api.post("/user/updateprofile", formData, {
    headers: getAuthHeaders(),
  });
  return res.data.data;
};