'use client';
import { createContext, useState, useContext } from "react";
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    toast.success(`${item.name} added to cart 🛒`);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id && i.quantity < 5
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const increment = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i._id === id && i.quantity < 5
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decrement = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((i) =>
          i._id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((i) => i._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increment,
        decrement,
        getQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
