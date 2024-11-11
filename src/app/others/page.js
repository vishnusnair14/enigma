"use client";
import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu visibility on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#home" className="text-2xl font-semibold">
            IEEE Event 2024
          </a>

          {/* Mobile Hamburger Icon */}
          <button
            className="text-2xl md:hidden"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="text-white">&#9776;</span>
          </button>

          {/* Menu Items */}
          <ul
            className={`md:flex space-x-6 ${isMenuOpen ? "block" : "hidden"} md:block`}
          >
            <li>
              <a href="/about" className="hover:text-yellow-500">
                About
              </a>
            </li>
            <li>
              <a href="#highlights" className="hover:text-yellow-500">
                Highlights
              </a>
            </li>
            <li>
              <a href="/registeration" className="hover:text-yellow-500">
                Registration
              </a>
            </li>
            <li>
              <a href="#competitions" className="hover:text-yellow-500">
                Competitions
              </a>
            </li>
            <li>
              <a href="/others" className="hover:text-yellow-500">
                Others
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-black text-4xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="text-lg text-gray-700">
          <p>Have questions? We’ve got you covered!</p>
          <ul className="space-y-4">
            <li><strong>What is the event about?</strong> The IEEE Event 2024 is focused on technology and innovation.</li>
            <li><strong>How do I register?</strong> Simply fill out the registration form above!</li>
            <li><strong>Is there a fee?</strong> Check our ticketing information for all details.</li>
          </ul>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-black  text-4xl font-semibold mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-6">For more inquiries, reach out to us!</p>
        <form className="max-w-lg mx-auto space-y-6">
          <input
            type="email"
            name="contactEmail"
            placeholder="Your Email Address"
            className="w-full p-4 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-4 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Social Media Links Section */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-black text-4xl font-semibold mb-6">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-all"
            aria-label="Facebook"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition-all"
            aria-label="Twitter"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 transition-all"
            aria-label="Instagram"
          >
            <FaInstagram size={30} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 IEEE Event. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
