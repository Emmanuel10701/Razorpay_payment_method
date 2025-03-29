"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CreditCard, DollarSign } from "lucide-react";

export default function Dashboard() {
  const [credits, setCredits] = useState({ freecredits: 0, paidcredits: 0 });
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      fetchCredits(storedToken);
    }
  }, []);

  const fetchCredits = async (authToken) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/credits/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      setCredits(response.data);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-300 hover:shadow-2xl transition duration-300">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Dashboard</h2>
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-gray-700">Welcome, {user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-between">
            <CreditCard size={32} />
            <div>
              <p className="text-lg font-medium">Free Credits</p>
              <p className="text-2xl font-bold">{credits.freecredits}</p>
            </div>
          </div>
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-between">
            <DollarSign size={32} />
            <div>
              <p className="text-lg font-medium">Paid Credits</p>
              <p className="text-2xl font-bold">{credits.paidcredits}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
