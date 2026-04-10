"use client";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const { cartItems, increment, decrement, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-[#f9f6f3] min-h-screen font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 pt-10">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.title)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increment(item.title)}
                    className="bg-gray-200 px-3 py-1 rounded"
                    disabled={item.quantity === 5}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.title)}
                    className="ml-4 text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-4">
              <p className="text-lg font-semibold">
                Total: <span className="text-black">₹{totalPrice}</span>
              </p>
              <button className="mt-4 bg-black text-white px-6 py-2 rounded-full">
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
