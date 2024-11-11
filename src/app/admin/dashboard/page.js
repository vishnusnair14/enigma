"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Navbar Component
const Navbar = ({ isMenuOpen, toggleMenu }) => (
  <nav className="bg-gray-800 text-white shadow-md fixed w-full top-0 z-50">
    <div className="container mx-auto px-6 py-3 flex items-center justify-between">
      <a href="#home" className="text-2xl font-semibold">IEEE Event 2024</a>
      <button className="text-2xl md:hidden" onClick={toggleMenu} aria-label="Menu">
        <span className="text-white">&#9776;</span>
      </button>
      <ul className={`md:flex space-x-8 ${isMenuOpen ? "block" : "hidden"} md:block`}>
        <li><Link href="/" className="text-white-400 hover:text-yellow-500">GO TO WEBSITE</Link></li>
      </ul>
      
    </div>
  </nav>
  
);

export default function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckStatus, setAuthCheckStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  // State for Navbar menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const router = useRouter();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    // Authentication check logic here (same as before)
  }, []);

  const fetchPendingRegistrations = async () => {
    setPendingRegistrations(0)
    try {
      // Make a GET request to the API route you just created
      const response = await fetch("/api/getPendingRegistrations");
  
      // If the response is successful, parse the JSON and set the state
      if (response.ok) {
        const data = await response.json();
        setPendingRegistrations(data);
      } else {
        setError("Failed to load pending registrations.");
      }
    } catch (error) {
      setError("Failed to load pending registrations.");
    }
  };

  const fetchCompletedRegistrations = async () => {
    setPendingRegistrations(0)
    try {
      // Make a GET request to the API route you just created
      const response = await fetch("/api/getCompletedRegistrations");
  
      // If the response is successful, parse the JSON and set the state
      if (response.ok) {
        const data = await response.json();
        setPendingRegistrations(data);
      } else {
        setError("Failed to load completed registrations.");
      }
    } catch (error) {
      setError("Failed to load completed registrations.");
    }
  };
  

  useEffect(() => {
    setAuthCheckStatus("Checking authentication, please wait...");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setAuthCheckStatus("");  
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setTimeout(() => {
      const token = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("auth_token="));
      if (token) {
        setIsAuthenticated(true);
      }
    }, 100);

    return () => clearInterval(interval); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/admin-creds.json");
      const data = await response.json();
  
      const user = data.find(
        (user) => user.username === username && user.password === password
      );
  
      if (user) {
        document.cookie = "auth_token=Gc0yapYGUdOy4SvPtWwOEAVVHigr5YeopMGrBy76XuoyiGV0gbUmqDTJWG6k77G6; path=/";
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to authenticate. Please try again.");
    }
  };
  

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1946 00:00:00 UTC"; 
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  let content;
  if (loading) {
    content = (
      <div className="flex justify-center items-center flex-col ">
        {authCheckStatus && <p className="mt-16 flex justify-center items-center text-center text-blue-600">{authCheckStatus}</p>}
      </div>
    );
  } else if (isAuthenticated) {
    content = (
      <div className="text-center ">
        <h4 className="text-right text-red-800 mt-12 font-semibold" onClick={handleLogout}>LOGOUT</h4>
        <h1 className="text-red-800 text-3xl font-semibold mb-8 mt-8">ADMIN DASHBOARD</h1>
        {/* <p className="text-gray-600 mb-6">Here you can manage registrations and view important data.</p> */}
        <div className="flex justify-center space-x-6">
          <div
            className="category-card w-60 h-20 flex justify-center items-center bg-blue-800 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={fetchPendingRegistrations}
          >
            <span className="font-semibold p-6">View pending registrations</span>
          </div>

          <div className="category-card w-60 h-20 flex justify-center items-center bg-green-800 text-white rounded-lg shadow-md hover:scale-105 transform transition duration-300 cursor-pointer"
          onClick={fetchCompletedRegistrations}>
            <span className="font-semibold p-6">View completed registration</span>
          </div>
        </div>

        {pendingRegistrations.length > 0 ? (
  <div className="mt-6 overflow-x-auto ">
    <h2 className="text-black text-2xl font-bold mb-4">Pending Registrations</h2>
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">Name</th>
          <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">Phone</th>
          <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">Email</th>
          <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pendingRegistrations.map((reg) => (
          <tr key={reg.phone} className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.name}</td>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{reg.phone}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
            <td className="px-6 py-4 text-sm text-center">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    onClick={() => {
      router.push(`/registrationDetails?phone=${reg.phone}`);
    }}>
      View Details
    </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className="mt-6 text-center text-lg text-gray-700">
    <p></p>
  </div>
)}


      </div>
    );
  } else {
    content = (
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-16">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="p-6 flex-grow">{content}</div>

      {loading && (
        <div className="w-full mt-4 fixed bottom-0 left-0 p-4 bg-gray-100">
          <progress className="w-full" value={progress} max={100}></progress>
        </div>
      )}
    </div>
  );
}
