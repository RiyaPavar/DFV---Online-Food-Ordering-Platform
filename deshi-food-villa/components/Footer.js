// components/Footer.jsx
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600">Deshi Food Villa</h2>
          <p className="mt-2 text-sm">
            Serving fresh and authentic food within a 5 km range. Taste the tradition delivered to your door.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail size={16} /> contact@deshifoodvilla.com</li>
            <li className="text-sm mt-4">Delivery Range: <strong>Within 5 km</strong></li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#"><Facebook className="hover:text-orange-500" /></a>
            <a href="#"><Instagram className="hover:text-orange-500" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-gray-500">
        © {new Date().getFullYear()} Deshi Food Villa. All rights reserved.
      </div>
    </footer>
  );
}
