import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (id, title, altTitle, height, width, url, user) => {
    setItems((prevState) => [
      ...prevState,
      { id, title, altTitle, height, width, url, user },
    ]);
  };

  const removeFromCart = (id) => {
    setItems(items.filter((poster) => poster.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
