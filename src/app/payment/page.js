"use client";
import React, { useState } from "react";
import Image from 'next/image';
import GooglePayButton from "@google-pay/button-react";

const PaymentDetailsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const amount = 1000; 
  const recipient = 'vishnuskky2001@oksbi'; 
  // Google Pay and PhonePe UPI deep links
  const googlePayUPILink = `upi://pay?pa=${recipient}&pn=Recipient%20Name&am=${amount}&cu=INR`;
  const phonePeUPILink = `upi://pay?pa=${recipient}&pn=Recipient%20Name&am=${amount}&cu=INR`;

  // Toggle Menu Handler
  const toggleMenu = () => setIsMenuOpen(prev => !prev);


  // Navbar Component
  const Navbar = ({ isMenuOpen, toggleMenu }) => (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="text-2xl font-semibold">IEEE Event 2024</a>
        <button className="text-2xl md:hidden" onClick={toggleMenu} aria-label="Menu">
          <span className="text-white">&#9776;</span>
        </button>
        <ul className={`md:flex space-x-8 ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <li><a href="#home" className="text-yellow-300 hover:text-white">HOME</a></li>
          <li><a href="#highlights" className="text-yellow-300 hover:text-white">Event Highlights</a></li>
          <li><a href="#register" className="text-yellow-300 hover:text-white">Registration</a></li>
          <li><a href="#competitions" className="text-yellow-300 hover:text-white">Competitions</a></li>
          <li><a href="/others" className="text-yellow-300 hover:text-white">Others</a></li>
          <li><a href="/apl" className="text-yellow-300 hover:text-white">Admin Portal</a></li>
        </ul>
      </div>
    </nav>
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
    
      {/* Navbar */}
      {/* <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} /> */}

      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <h2 className="text-3xl font-semibold text-gray-800">Bank Transfer Details</h2>
        <p className="text-lg text-gray-700 mb-6">Please use one of the payment methods below to complete your payment.</p>

        {/* Bank Transfer Details */}
        <div className="border p-6 mb-6 rounded-lg bg-white shadow-lg">
          <h3 className="font-medium text-lg text-gray-800">Bank Details</h3>
          <p>Account Name: XYZ Bank</p>
          <p>Account Number: 1234567890</p>
          <p>IFSC Code: ABCD1234</p>
          <p>Amount: ₹{amount}</p>
          <p>Recipient: {recipient}</p>
        </div>
        {/* Payment Methods: Google Pay and PhonePe */}
        <div className="flex justify-center md:justify-between space-x-8">
          {/* Google Pay Logo */}
          <a href={googlePayUPILink} target="_blank" rel="noopener noreferrer">
            <Image
              src="https://e7.pngegg.com/pngimages/849/112/png-clipart-google-pay-send-android-computer-icons-android-text-trademark-thumbnail.png"
              alt="Google Pay"
              width={96}
              height={48}
              className="cursor-pointer"
            />
          </a>

          {/* PhonePe Logo */}
          <a href={phonePeUPILink} target="_blank" rel="noopener noreferrer">
            <Image
              src="https://e7.pngegg.com/pngimages/849/112/png-clipart-google-pay-send-android-computer-icons-android-text-trademark-thumbnail.png"
              alt="PhonePe"
              width={96}
              height={48}
              className="cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
