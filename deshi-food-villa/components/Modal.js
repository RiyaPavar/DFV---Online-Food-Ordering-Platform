'use client';
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function Modal({ item, quantity, onClose }) {
  const { addToCart, increment, decrement } = useCart();
  const modalRef = useRef();

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 max-w-md w-full relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <div className="w-full h-60 relative mb-4 rounded-lg overflow-hidden">
          <Image
            src={item.img || "/fallback.png"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <p className="font-semibold text-red-600 mb-4">₹{item.price}</p>

        {quantity > 0 ? (
          <div className="flex items-center justify-center bg-gray-100 p-2 rounded-full">
            <button onClick={() => decrement(item.name)} className="px-3 py-1">–</button>
            <span className="px-4">{quantity}</span>
            <button onClick={() => increment(item.name)} className="px-3 py-1">+</button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(item)}
            className="w-full bg-green-600 text-white py-2 rounded-full font-medium hover:bg-green-700"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
