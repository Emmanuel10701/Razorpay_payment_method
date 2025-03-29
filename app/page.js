"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaCreditCard, FaUsers, FaShieldAlt, FaMobileAlt, FaGlobe } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLoginRedirect = () => {
    setLoading(true);
    alert("Redirecting to login...");
    setTimeout(() => {
      router.push("/login"); // Redirect to the login page
    }, 2000); // Simulate a delay for the spinner
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-700 text-white py-5 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-extrabold">TestPayment</h1>
          <nav>
            <ul className="flex space-x-6 text-lg">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto text-center py-24 px-6">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            The Future of Secure Digital Payments
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience fast, secure, and effortless payments with our innovative platform.
            Enjoy seamless transactions with cutting-edge security features.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center transition-all duration-300 shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" />
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="container mx-auto py-20 px-6">
          <h3 className="text-4xl font-bold text-center mb-10 text-gray-900">Powerful Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaLock size={40} className="text-blue-600 mb-4" />
              <h4 className="text-xl font-semibold">Secure Transactions</h4>
              <p className="text-gray-600 mt-3">
                Your data and funds are protected with top-tier encryption technology.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaCreditCard size={40} className="text-green-600 mb-4" />
              <h4 className="text-xl font-semibold">Multiple Payment Options</h4>
              <p className="text-gray-600 mt-3">
                Choose from credit cards, digital wallets, and other flexible payment methods.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaUsers size={40} className="text-purple-600 mb-4" />
              <h4 className="text-xl font-semibold">User-Friendly Experience</h4>
              <p className="text-gray-600 mt-3">
                An intuitive interface designed to simplify your transactions effortlessly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaShieldAlt size={40} className="text-red-600 mb-4" />
              <h4 className="text-xl font-semibold">Fraud Protection</h4>
              <p className="text-gray-600 mt-3">
                Advanced fraud detection algorithms keep your transactions safe.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaMobileAlt size={40} className="text-yellow-600 mb-4" />
              <h4 className="text-xl font-semibold">Mobile Optimized</h4>
              <p className="text-gray-600 mt-3">
                Enjoy smooth transactions on your mobile device, anytime, anywhere.
              </p>
            </div>
            {/* New Feature Card */}
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaGlobe size={40} className="text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold">Global Reach</h4>
              <p className="text-gray-600 mt-3">
                Expand your business with support for international payments and currencies.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg font-light">
            &copy; {new Date().getFullYear()} TestPayment. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#terms" className="hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
