"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function StickyCheckoutBar() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItems.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-full shadow-xl z-50 px-4 py-3 flex items-center gap-4 backdrop-blur-sm bg-opacity-90 hover:shadow-2xl transition-all">
      <div className="flex items-center gap-3">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        </div>
        <span className="font-medium text-gray-800 text-sm">
          ₹{totalPrice.toFixed(2)}
        </span>
      </div>
      
      <Link href="/checkout">
        <button className="bg-black hover:bg-gray-800 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          Checkout
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </Link>
    </div>
  );
}