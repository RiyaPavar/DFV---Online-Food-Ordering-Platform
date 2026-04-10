'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useCart } from "../context/CartContext";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { cartItems } = useCart();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    router.push('/checkout');
  };

  return (
    <>
      <nav className="bg-[#f9f6f3] px-6 md:px-20 py-6 shadow-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            <span className="text-red-600">Deshi</span> Food Villa
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
            <li className="hover:text-red-600 transition">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-red-600 transition">
              <Link href="/menu">Menu</Link>
            </li>
            <li className="hover:text-red-600 transition">
              <Link href="/about">About Us</Link>
            </li>
            <li className="hover:text-red-600 transition">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Link href="/signup" className="hidden md:block">
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                Sign Up
              </button>
            </Link>
            <button className="relative" onClick={handleCartClick}>
              <ShoppingCartIcon className="h-7 w-7 text-gray-700 hover:text-red-600 transition" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalQuantity}
                </span>
              )}
            </button>
            {/* Hamburger Icon */}
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Bars3Icon className="h-7 w-7 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition w-full text-left">
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
