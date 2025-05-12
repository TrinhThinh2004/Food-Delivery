import React from "react";
import "./NavbarAD.css";
import {assetsAD} from "../../../admin_assets/assetsAD.js";


const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assetsAD.logo} alt="" />
      <img className="profile" src={assetsAD.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
