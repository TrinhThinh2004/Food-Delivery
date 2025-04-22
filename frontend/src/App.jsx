import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Login from "./components/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
// import ManageFoods from "./pages/Admin/ManageFoods";
import ManageUsers from "./pages/Admin/ManageUsers";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Routes>
      {/* Routes dành cho người dùng */}
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

      {/* Routes dành cho admin */}
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/foods"
        element={
          <AdminLayout>
            {/* <ManageFoods /> */}
          </AdminLayout>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminLayout>
            <ManageUsers />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default App;