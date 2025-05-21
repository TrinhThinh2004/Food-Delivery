import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import UserChat from "../components/Chat/UserChat";

const UserLayout = ({ children, setShowLogin }) => {
  return (
    <>
    <div className="app">
      <Navbar  setShowLogin={setShowLogin} />
      <div>{children}</div>
      
      </div>
      <UserChat />
      <Footer />
    </>
  );
};

export default UserLayout;