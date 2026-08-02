import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((item) => item._id === product._id);
      if (existItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prevItems, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);