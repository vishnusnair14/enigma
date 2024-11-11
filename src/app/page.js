"use client";

import React, { useEffect, useState } from "react";

// Countdown Logic
const useCountdown = (eventDate) => {
  const [countdown, setCountdown] = useState("");

  const calculateCountdown = () => {
    const now = new Date();
    const timeDifference = eventDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      setCountdown("Registration Closed");
      return;
    }

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
      setCountdown(`${daysLeft} Days left`);
    } else {
      setCountdown("Registration Closed");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(calculateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return countdown;
};

// Navbar Component
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
        <li><a href="/registration" className="hover:text-yellow-500">Registration</a></li>
        <li><a href="#competitions" className="hover:text-yellow-500">Competitions</a></li>
        <li><a href="/others" className="hover:text-yellow-500">Others</a></li>
        <li><a href="/admin/dashboard" className="text-yellow-600 hover:text-yellow-500">Admin Portal</a></li>
      </ul>
    </div>
  </nav>
);

// Hero Section Component
const HeroSection = () => (
  <section id="home" className="relative w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative container mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl font-bold mb-4">IEEE Event 2024</h1>
      <p className="text-2xl mb-6">Join us for an exciting event filled with insightful sessions and workshops!</p>
      <a href="/registration" className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-8 rounded-lg text-lg">Register Now</a>
    </div>
    
  </section>
);

// Countdown Section Component
const CountdownSection = ({ countdown }) => (
  <section className="bg-gray-100 py-8 text-center">
    <div className="text-4xl font-bold text-red-800 mb-6">{countdown}</div>
    <a href="/registration" className="bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-8 rounded-lg text-lg">
      Register Now
    </a>
  </section>
);

// About Section Component
const AboutSection = () => (
  <section id="about" className="container mx-auto pt-16 py-8 px-6 text-center">
    <h2 className="text-black text-4xl font-semibold mb-6">About the Event</h2>
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-3xl mx-auto">
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4 text-justify">
        The IEEE Annual Event brings together innovators, thought leaders, and industry experts to share knowledge, showcase advancements, and foster collaboration in the world of technology and engineering. This year, we’ve got a thrilling lineup of sessions, workshops, and networking opportunities that you won’t want to miss!
      </p>
      <div className="text-lg text-gray-700">
        <p><strong>Event Date:</strong> December 21-22, 2024</p>
        <p><strong>Location:</strong> IEEE </p>
      </div>
      <a href="/eventdetails" className="inline-block mt-6 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
        See more...
      </a>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white py-6 text-center">
    <p>&copy; 2024 IEEE Event. All rights reserved.</p>
    <a href="/admin/dashboard" className="mt-4 text-yellow-500 hover:text-yellow-400 inline-block">
      Admin Portal Login
    </a>
  </footer>
);

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const eventDate = new Date("2024-12-21T00:00:00Z");
  const countdown = useCountdown(eventDate);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-50">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <HeroSection />
      <CountdownSection countdown={countdown} />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
