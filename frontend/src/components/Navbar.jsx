import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">ShopEase</div>
      <div className="space-x-4">
        {role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
        {role === "user" && <Link to="/user">Products</Link>}
        {!role ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
