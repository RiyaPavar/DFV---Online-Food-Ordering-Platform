'use client';
import { useCart } from "../context/CartContext";
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function FoodCard({ title, desc, price, img }) {
  const { addToCart, increment, decrement, getQuantity } = useCart();
  const quantity = getQuantity(title);

  return (
    <div className="bg-white rounded-3xl p-4 shadow-md flex flex-col items-center hover:scale-105 transition-transform duration-300 relative">
      <img
        src={img}
        alt={title}
        className="rounded-full w-40 h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
      <p className="text-md font-bold mt-2">₹{price}</p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart({ title, desc, price, img })}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700 transition"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Add to Cart
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => decrement(title)}
            className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-full"
          >
            <MinusIcon className="h-5 w-5" />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => increment(title)}
            disabled={quantity === 5}
            className={`p-2 rounded-full transition ${
              quantity === 5
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodCard;
