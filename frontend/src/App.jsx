import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./components/Login/Login";
import Add from "./pages/Admin/Add/Add";
import List from "./pages/Admin/List/List";
import Orders from "./pages/Admin/Orders/Orders";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import UserChat from "./components/Chat/userchat";
import AdminChat from "./pages/Admin/Chat/adminchat";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const url="http://localhost:4000";

  return (
    <><ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
  {showLogin && <Login setShowLogin={setShowLogin} />}
    <Routes>
      {/* Routes dành cho người dùng */}
      <Route
          path="/chat"
          element={
            <UserLayout setShowLogin={setShowLogin}>
              <UserChat />
            </UserLayout>
          }
        />
      <Route
        path="/"
        element={
          <UserLayout setShowLogin={setShowLogin}>
            <Home />
          </UserLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <UserLayout setShowLogin={setShowLogin}>
            <Cart />
          </UserLayout>
        }
      />
      <Route
        path="/order"
        element={
          <UserLayout setShowLogin={setShowLogin}>
            <PlaceOrder />
          </UserLayout>
        }
      />
      <Route
        path="/verify"
        element={
          <UserLayout setShowLogin={setShowLogin}>
            <Verify />
          </UserLayout>
        }
      />
      <Route
        path="/myorders"
        element={
          <UserLayout setShowLogin={setShowLogin}>
            <MyOrders />
          </UserLayout>
        }
      />
      {/* Routes dành cho admin */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* <Route path="add" element={<Add url={url} />} /> */}
        <Route path="list" element={<List url={url}/>} />
        <Route path="orders" element={<Orders url={url}/>} />
         <Route path="chat" element={<AdminChat  url={url}/>} />
      </Route>
    </Routes>
    </>
  );
};

export default App;