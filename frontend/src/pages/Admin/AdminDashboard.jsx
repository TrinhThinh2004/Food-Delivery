import React from "react";
import "./Admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-item">
          <h2>Foods</h2>
          <p>50</p>
        </div>
        <div className="stat-item">
          <h2>Users</h2>
          <p>200</p>
        </div>
        <div className="stat-item">
          <h2>Orders</h2>
          <p>120</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;