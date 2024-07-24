import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});
const token = localStorage.getItem("token");

export const fetchProjectMembers = (projectId) => {
  return api.get(`/user/getdetailproject/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchAccessTypes = () => {
  return api.get(`/user/getaccess`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchProjects = async () => {
  try {
    const res = await api.get(`/user/getlistproject`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data || [];
  } catch (err) {
    throw new Error("Error fetching projects");
  }
};
