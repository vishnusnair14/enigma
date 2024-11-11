"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, updateDoc, collection, setDoc, getDocs, query, where } from "firebase/firestore";
import BottomDrawer from 'react-bottom-drawer';


const Navbar = ({ isMenuOpen, toggleMenu }) => (
  <nav className="bg-gray-800 text-white shadow-md fixed w-full top-0 z-50">
    <div className="container mx-auto px-6 py-3 flex items-center justify-between">
      <a href="#home" className="text-2xl font-semibold">IEEE Event 2024</a>
      <button className="text-2xl md:hidden" onClick={toggleMenu} aria-label="Menu">
        <span className="text-white">&#9776;</span>
      </button>
      <ul className={`md:flex space-x-8 ${isMenuOpen ? "block" : "hidden"} md:block`}>
        <li><a href="#home" className="text-blue-400 hover:text-yellow-500">HOME</a></li>
        <li><a href="#highlights" className="hover:text-yellow-500">Event Highlights</a></li>
        <li><a href="#register" className="hover:text-yellow-500">Registration</a></li>
        <li><a href="#competitions" className="hover:text-yellow-500">Competitions</a></li>
        <li><a href="/others" className="hover:text-yellow-500">Others</a></li>
      </ul>
    </div>
  </nav>
);

const LandingPage = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isPhoneExisting, setIsPhoneExisting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "vishnu",
    email: "vishnuskky2001@gmail.com",
    phone: "9544147335",
    college: "SJCE Mysore",
    year: "3",
    gender: "Male",
    foodPreferences: "Veg",
    arrivalHour: "3",
    arrivalMinute: "24",
  });
  const [isChecking, setIsChecking] = useState(false);  

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsChecking(true); 
    const isExists = await checkIfDocumentExists(formData.phone);
    
    setIsChecking(false); 
    
    if (isExists) {
      setIsPhoneExisting(true);
      setIsBottomSheetOpen(true); 
    } else {
      try {
        // Use doc() to set the phone number as the document ID
        const docRef = doc(db, "PendingRegistrations", formData.phone); 
        
        // Use setDoc to write the document with the specified ID
        await setDoc(docRef, {
          ...formData,
          status: "pending",
          timestamp: new Date().toLocaleString('en-US', { 
            weekday: 'long',  // Optional: Displays the full weekday name
            year: 'numeric',
            month: 'long',    // Full month name
            day: 'numeric',
            hour: '2-digit',  // 12-hour format
            minute: '2-digit',
            second: '2-digit',
            hour12: true       // Use 12-hour format with AM/PM
        }),
                });
  
        router.push("/payment");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };
  
  // Check if document exists
  const checkIfDocumentExists = async (phoneNumber) => {
    const q = query(collection(db, "PendingRegistrations"), where("phone", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; 
  };

  const handleUpdate = async () => {
    setLoading(true);
    setIsChecking(true); // Start checking
    try {
      const q = query(collection(db, "PendingRegistrations"), where("phone", "==", formData.phone));
      const querySnapshot = await getDocs(q);
      const docId = querySnapshot.docs[0].id;
      await updateDoc(doc(db, "PendingRegistrations", docId),{ ...formData,
    status:"pending",
    timestamp: new Date().toLocaleString('en-US', { 
      weekday: 'long',  // Optional: Displays the full weekday name
      year: 'numeric',
      month: 'long',    // Full month name
      day: 'numeric',
      hour: '2-digit',  // 12-hour format
      minute: '2-digit',
      second: '2-digit',
      hour12: true       // Use 12-hour format with AM/PM
  })});
 
      router.push("/payment");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    
    setIsChecking(false); 
    setIsBottomSheetOpen(false); 
  };

  const handleCancel = () => {
    setIsBottomSheetOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      year: "",
      gender: "",
      foodPreferences: "",
      arrivalHour: "",
      arrivalMinute: "",
    });
  };

  return (
    <div className="bg-gray-50">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

    {/* Registration Section */}
    <section id="register" className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-black text-4xl font-semibold mb-6">Register for the Event</h2>
        <p className="text-lg text-gray-700 mb-8">Fill out the registration form to secure your spot at the event.</p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg"
            required
            pattern="[0-9]{10}"
            title="Phone number must be 10 digits"
            maxLength="10"
          />
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College Name"
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg uppercase"
            required
          />

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="foodPreferences"
            value={formData.foodPreferences}
            onChange={handleChange}
            className="text-gray-800 w-full p-4 border border-gray-300 rounded-lg"
            required
          >
            <option value="Veg">Vegetarian</option>
            <option value="Non-Veg">Non-Vegetarian</option>
          </select>

          <div className="flex space-x-4">
            <select
              name="arrivalHour"
              value={formData.arrivalHour}
              onChange={handleChange}
              className="text-gray-800 w-1/2 p-4 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Hour</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              name="arrivalMinute"
              value={formData.arrivalMinute}
              onChange={handleChange}
              className="text-gray-800 w-1/2 p-4 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Minute</option>
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            disabled={isChecking}  // Disable button while checking
          >
            {isChecking ? 'Please wait...' : 'Complete Payment'}
          </button>
        </form>
      </section>


   {/* Bottom Sheet for Data Update */}
   <BottomDrawer
        isVisible={isBottomSheetOpen}
        onClose={handleCancel}
        className="z-50"
      >
        <div className="p-6">
          <h2 className="text-black text-xl font-semibold">Data Already Exists</h2>
          <p className="text-black mt-2 text-justify ">Data associated with this phone number already exists. Do you want to update information and complete payment?</p>
          <div className="mt-4 flex space-x-4">
          <button
            onClick={handleUpdate}
            className="bg-yellow-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Yes, Update"}
          </button>
                 <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      </BottomDrawer>

      <footer className="bg-gray-800 text-white py-6 text-center">
    <p>&copy; 2024 IEEE Event. All rights reserved.</p>
    <a href="/admin/dashboard" className="mt-4 text-yellow-500 hover:text-yellow-400 inline-block">
      Admin Portal Login
    </a>
  </footer>
    </div>
  );
};


export default LandingPage;
