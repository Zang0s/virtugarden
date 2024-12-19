"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<Product, "quantity">) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
  
      if (existingProduct) {
        // Jeśli produkt już istnieje, zwiększ ilość
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Jeśli produkt nie istnieje, dodaj go z ilością 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item): number => {
        const itemPrice = parseFloat(item.price.replace(" zł/dzień", ""));
        return total + itemPrice * item.quantity;
    }, 0);
  };
  
  
  const removeFromCart = (id: number) => {
      setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      
      if (existingProduct && existingProduct.quantity > 1) {
          // Jeśli ilość > 1, zmniejsz ilość
          return prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
    } else {
        // Jeśli ilość = 1, usuń produkt
        return prev.filter((item) => item.id !== id);
    }
});
};




  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
