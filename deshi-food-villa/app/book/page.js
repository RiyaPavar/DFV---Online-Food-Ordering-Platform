'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function BookTablePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '',
    date: '',
    time: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Table booked successfully!');
    // You can integrate Web3Forms or Formspree here
  };

  return (
    <div className="bg-[#f9f6f3] text-gray-800">
      <Navbar />
      <section className="px-6 md:px-20 py-12 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Book a <span className="text-red-600">Table</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border px-4 py-3 rounded-md w-full"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="border px-4 py-3 rounded-md w-full"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border px-4 py-3 rounded-md w-full"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            className="border px-4 py-3 rounded-md w-full"
            required
            value={formData.guests}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="border px-4 py-3 rounded-md w-full"
            required
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            className="border px-4 py-3 rounded-md w-full"
            required
            value={formData.time}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Special Request (optional)"
            className="border px-4 py-3 rounded-md w-full md:col-span-2 resize-none h-24"
            value={formData.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition md:col-span-2"
          >
            Reserve Table
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
