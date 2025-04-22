import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const UserLayout = ({ children, setShowLogin }) => {
  return (
    <>
    <div className="app">
      <Navbar  setShowLogin={setShowLogin} />
      <div>{children}</div>
      
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;