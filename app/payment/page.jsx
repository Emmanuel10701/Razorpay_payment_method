"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Payment() {
  const [amount, setAmount] = useState("");
  const [credits, setCredits] = useState(0);
  const [currency, setCurrency] = useState("USD"); // Default currency is USD
  const [exchangeRate, setExchangeRate] = useState(1); // Default exchange rate (1 USD = 1 USD)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCredits, setUserCredits] = useState({ freecredits: 0, paidcredits: 0 });

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // Fetch the current exchange rate between USD and INR
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(process.env.EXCHANGE_RATE_API_URL);
        const rate = response.data.rates.INR; // Get the INR rate
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    // Fetch user credits
    const fetchUserCredits = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/api/creditsstatus/`, {
          headers: { Authorization: `Token ${localStorage.getItem("authToken")}` },
        });
        console.log("Fetched Credits Data:", response.data); // Debugging
        setUserCredits(response.data);
      } catch (error) {
        console.error("Error fetching user credits:", error);
      }
    };

    fetchUserCredits();
  }, []);

  const calculateCredits = (amount, currency) => {
    if (currency === "INR") {
      return amount * 20; // 1 INR = 20 credits
    } else if (currency === "USD") {
      return amount * 20 * exchangeRate; // 1 USD = 20 * exchangeRate credits
    }
    return 0;
  };

  const handleCheckout = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/api/razorpay/create-checkout/`,
        { amount, currency },
        { headers: { Authorization: `Token ${localStorage.getItem("authToken")}` } }
      );
      const { razorpay_order_id, payment_token } = response.data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Use Razorpay Key ID from environment variables
        amount: amount * 100, // Amount in smallest currency unit
        currency,
        name: "Your Company Name",
        description: "Purchase Credits",
        order_id: razorpay_order_id,
        handler: async (response) => {
          console.log("Payment Response:", response);
          await axios.post(
            `${process.env.API_BASE_URL}/api/razorpay/success/`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              payment_token,
            },
            { headers: { Authorization: `Token ${localStorage.getItem("authToken")}` } }
          );
          fetchUserCredits();
        },
        prefill: { email: localStorage.getItem("userEmail") },
        theme: { color: "#4CAF50" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-2xl shadow-2xl w-[720px] border border-gray-300 hover:shadow-2xl transition duration-300 mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Complete Your Payment</h2>
        <p className="text-gray-600 text-center mb-6">
          Select your currency and enter the amount to purchase credits.
        </p>
        <p className="text-center text-gray-500 mb-4">
          Current Exchange Rate: <span className="font-bold">1 USD = {exchangeRate} INR</span>
        </p>
        <select
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            setCredits(calculateCredits(amount, e.target.value));
          }}
          className="w-full p-4 text-xl border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-500 transition duration-300 mb-6"
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
        <input
          type="number"
          placeholder={`Enter amount (${currency})`}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setCredits(calculateCredits(e.target.value, currency));
          }}
          className="w-full p-6 text-xl border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-green-500 transition duration-300 mb-6"
        />
        <p className="text-slate-400 text-center mb-6 font-bold">
          Current Credits: <span className="text-black">{credits}</span>
        </p>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 text-white py-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex justify-center"
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" />
              <span className="ml-2">Processing...</span>
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[720px] border border-gray-300 hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Credits Summary</h3>
        <p className="text-gray-600 mb-2">Pending Tokens: <span className="font-bold">{userCredits.Pending_tokens || 0}</span></p>
        <p className="text-gray-600 mb-2">Remaining Questions: <span className="font-bold">{userCredits.remaining_questions || 0}</span></p>
        <p className="text-gray-600 mb-2">Free Credits: <span className="font-bold">{userCredits.freecredits || 0}</span></p>
        <p className="text-gray-600 mb-2">Paid Credits: <span className="font-bold">{userCredits.paidcredits || 0}</span></p>
        <p className="text-gray-600">Total Credits: <span className="font-bold">{(userCredits.freecredits || 0) + (userCredits.paidcredits || 0)}</span></p>
      </div>
    </div>
  );
}
