"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signin/", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      alert("Login successful!");
      router.push("/payment");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-12 rounded-xl shadow-lg w-[600px] h-[500px] border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-6 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300 mb-6"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-6 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-300 mb-6"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-4 text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex justify-center items-center"
          disabled={loading}
        >
{loading ? (
  <>
    <CircularProgress size={28} color="inherit" />
    <span className="ml-2">Processing...</span>
  </>
) : (
  "Login"
)}
        </button>
      </div>
    </div>
  );
}