'use client';
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, increment, decrement, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f6f3] font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto p-4 pt-10">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-gray-600 min-h-[50vh] text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-28 h-28 mb-6 opacity-70"
            />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm mb-6 max-w-sm">
              Looks like you haven’t added anything to your cart yet. Go ahead and explore our delicious menu!
            </p>
            <Link
              href="/menu"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6 pb-16">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.img || "/fallback.png"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item._id)}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increment(item._id)}
                    className="bg-gray-200 px-3 py-1 rounded"
                    disabled={item.quantity === 5}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
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
      </main>

      <Footer />
    </div>
  );
}
