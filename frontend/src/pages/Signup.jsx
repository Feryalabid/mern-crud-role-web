import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Form state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create account
      await API.post("/auth/signup", userData);

      // Step 2: Auto-login after signup
      const loginResponse = await API.post("/auth/login", {
        email: userData.email,
        password: userData.password,
      });

      // Step 3: Save token and role to localStorage
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("role", loginResponse.data.user.role);

      // Step 4: Redirect to dashboard based on role
      if (loginResponse.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || "Signup/Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 shadow rounded w-96 flex flex-col gap-3"
      >
        <h1 className="text-2xl font-bold mb-2">Signup</h1>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Role selection */}
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Submit */}
        <button className="bg-green-500 text-white p-2 rounded mt-2">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
