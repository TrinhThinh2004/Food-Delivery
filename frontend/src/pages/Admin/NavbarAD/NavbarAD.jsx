import React from "react";
import "./NavbarAD.css";
import { assetsAD } from "../../../admin_assets/assetsAD.js";
import { assets } from "../../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
const Navbar = () => {
  const {setToken} = React.useContext(StoreContext);
  const navigate = useNavigate(); 
  const handleLogout = () => {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/");
    }
  return (
    <div className="navbar">
      <img className="logo" src={assetsAD.logo} alt="Logo" />
      <div className="profile">
        <img className="profile-image" src={assetsAD.profile_image} alt="Profile" />
        <img onClick={handleLogout} className="logout" src={assets.logout_icon} alt="Logout" />
      </div>
    </div>
  );
};

export default Navbar;