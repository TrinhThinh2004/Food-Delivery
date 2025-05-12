import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import NavbarAD from "../pages/Admin/NavbarAD/NavbarAD";
import SidebarAD from "../pages/Admin/SidebarAD/SidebarAD";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

 useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/"); 
    }
  }, [navigate]);
  return (
    <div className="admin-layout">
      <NavbarAD />
      <hr />
      <div className="app-content">
        <SidebarAD />
        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;