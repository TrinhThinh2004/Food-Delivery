import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/list")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
