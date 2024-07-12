import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageUsers.css";
import Navbar from "./navbar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const token = localStorage.getItem("token");
      // const response = await axios.get(`/auth/users?page=${page}&limit=10`);
      const res = await axios.get("http://localhost:8080/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(res.data.data);
      // setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.profile.userId !== userId));
    } catch (err) {
      setError("Error deleting user");
      console.error(err);
    }
  };

  return (
    <div className="manage-users-container">
      <Navbar />
      <div className="content">
        <h2>Manage Users</h2>
        {error && <p className="error-text">{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user.profile.userId}>
              <span>
                {user.profile.first_name} {user.profile.last_name} (
                {user.profile.username})
              </span>
              <button
                onClick={() => handleDelete(user.profile.userId)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;

// return (
//     <div>
//         <h1>User List</h1>
//         <ul>
//             {users.map(user => (
//                 <li key={user.profile._id}>
//                     {user.profile.username} - {user.profile.first_name} {user.profile.last_name}
//                 </li>
//             ))}
//         </ul>
//         <div>
//             <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
//             <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
//         </div>
//     </div>
// );
// 