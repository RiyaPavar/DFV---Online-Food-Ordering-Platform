'use client';
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Modal from "./Modal";

export default function MenuFoodCard({ item }) {
  const { addToCart, getQuantity, increment, decrement } = useCart();
  const quantity = getQuantity(item._id);
  const [isOpen, setIsOpen] = useState(false);

  const imageSrc = item.img?.trim() ? item.img : "/fallback.png";
  const isAvailable = item.availability !== false;

  return (
    <>
      <div
        className={`w-full max-w-3xl mx-auto rounded-xl shadow p-7 min-h-[160px] flex items-stretch gap-4 relative transition-opacity duration-300 ${
          isAvailable ? 'bg-white hover:shadow-lg' : 'bg-gray-50 opacity-80'
        }`}
      >
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
          </div>
          <div className="mt-3">
            <span className="text-lg font-bold text-red-600">₹{item.price}</span>
          </div>
        </div>

        {/* Right image + button */}
        <div
          className="relative w-[140px] min-w-[140px] h-[120px]"
          onClick={() => isAvailable && setIsOpen(true)}
        >
          <Image
            src={imageSrc}
            alt={item.name || "Food item image"}
            fill
            className="object-cover rounded-lg"
          />

          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <span className="bg-white/80 px-3 py-1 text-xs font-semibold text-red-600 rounded shadow">
                Out of Stock
              </span>
            </div>
          )}

          {/* Button area */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
            {isAvailable ? (
              quantity > 0 ? (
                <div className="flex items-center bg-white rounded-full shadow text-base">
                  <button
                    onClick={(e) => { e.stopPropagation(); decrement(item._id); }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    –
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); increment(item._id); }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                  className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:bg-green-700"
                >
                  ADD
                </button>
              )
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-600 px-6 py-2 rounded-full text-sm font-semibold shadow cursor-not-allowed"
              >
                Unavailable
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && isAvailable && (
        <Modal item={item} quantity={quantity} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
