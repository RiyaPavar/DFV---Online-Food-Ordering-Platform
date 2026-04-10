'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactUsPage() {
  return (
    <div className="bg-[#f9f6f3] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 px-6 md:px-20 bg-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          Contact <span className="text-red-600">Us</span>
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
        </p>
      </section>

      {/* Contact Info & Form */}
      <section className="px-6 md:px-20 py-12 bg-[#fff7f4]">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Contact Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Deshi Food Villa</h2>
            <p>Delivering delicious Desi meals to your doorstep.</p>
            <div>
              <h4 className="font-semibold">Address</h4>
              <p>123 Deshi Street, Near Central Market,<br />YourCity, 123456</p>
            </div>
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>+91 9876543210</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>support@deshifoodvilla.com</p>
            </div>
          </div>

          {/* Right Contact Form */}
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="bg-white p-6 rounded-lg shadow space-y-4"
          >
            <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Extra Info + Google Map */}
      <section className="px-6 md:px-20 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Extra Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Working Hours</h2>
            <ul className="text-gray-700 space-y-2">
              <li>Monday – Saturday: 9:00 AM – 10:00 PM</li>
              <li>Sunday: 10:00 AM – 8:00 PM</li>
              <li>Delivery Available: Within 5 KM</li>
            </ul>
          </div>

          {/* Google Map */}
          <div className="w-full h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.645239177291!2d82.8697015!3d26.3770657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990fdc60c6d9edf%3A0xaa950045bb7ba17f!2sDeshi%20Food%20Villa%2C%20Ram%20nagar%20Road%2C%20Nyori%2C%20Uttar%20Pradesh%20224139!5e0!3m2!1sen!2sin!4v1719392230153!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
