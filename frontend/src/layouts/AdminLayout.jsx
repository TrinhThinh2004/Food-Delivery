import React from "react";
import "./AdminLayout.css";
import { assets } from "../assets/assets"; // Đảm bảo bạn đã import đúng file assets

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Tomato.</h2>
        <ul>
          <li>
            <img src={assets.add_icon_white} alt="Add Items" />
            <span>Add Items</span>
          </li>
          <li>
            <img src={assets.add_icon_white} alt="List Items" />
            <span>List Items</span>
          </li>
          <li>
            <img src={assets.add_icon_white} alt="Orders" />
            <span>Orders</span>
          </li>
        </ul>
      </div>
      <div className="admin-main">
        <div className="admin-header">
          <h1>Admin Panel</h1>
        </div>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;