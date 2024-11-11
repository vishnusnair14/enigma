"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import firebase from 'firebase/app';
import { Timestamp } from 'firebase/firestore';


export default function RegistrationDetailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/getRegistrationDetails/${phone}`);
      if (res.ok) {
        const data = await res.json();
        
        setRegistrationData(data);
      } else {
        setMessage('Registration not found');
      }
    };

    fetchData();
  }, [phone]);

  const sendEmail = async (type) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registrationData.email,
          type: type,
        }),
      });

      if (response.ok) {
        setMessage(`${type === 'confirmation' ? 'Confirmation' : 'Payment'} email sent successfully.`);
      } else {
        setMessage('Failed to send email');
      }
    } catch (error) {
      setMessage('Error occurred while sending email');
    } finally {
      setLoading(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
  <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6 text-center">
      <h2 className="text-black text-3xl font-bold mb-2">Student Details</h2>
      <p className="text-gray-500">Here&apos;s your registration information for the upcoming IEEE Enigma event.</p>
    </div>

    <div className="p-6 bg-gray-100 text-gray-800">
      <h3 className="text-2xl font-semibold mb-4">Registration Details</h3>
      <p className="mb-2"><strong>Name:</strong> {registrationData.name}</p>
      <p className="mb-2"><strong>Phone:</strong> {registrationData.phone}</p>
      <p className="mb-2"><strong>Email:</strong> {registrationData.email}</p>
      <p className="mb-2"><strong>College:</strong> {registrationData.college}<strong>    Year:</strong> {registrationData.year}</p>
      <p className="mb-2"><strong>Food Preference:</strong> {registrationData.foodPreferences}</p>
      <p className="mb-2">
  <strong>Registration Time:</strong> {registrationData.timestamp}
</p>



      <div className="mt-6">
        <button
          onClick={() => sendEmail('confirmation')}
          className={`w-full mb-4 px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Sending...' : <><FaEnvelope className="inline mr-2" /> Send Registration Confirmation Mail</>}
        </button>
        <button
          onClick={() => sendEmail('payment')}
          className={`w-full px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-500 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Sending...' : <><FaCheckCircle className="inline mr-2" /> Complete Payment Email</>}
        </button>
      </div>
      {message && <p className="mt-4 text-center text-blue-700 font-semibold">{message}</p>}
    </div>
  </div>
</div>

  );
};
