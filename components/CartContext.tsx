"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, getCart, addToCart as addToCartUtil, removeFromCart as removeFromCartUtil, updateQuantity as updateQuantityUtil, clearCart as clearCartUtil } from "@/lib/cart";

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  appliedCoupon: string | null;
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalPrice = subtotal - discount;

  const addToCart = (product: any) => {
    const newCart = addToCartUtil(product);
    setCart([...newCart]);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const newCart = removeFromCartUtil(productId);
    setCart([...newCart]);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const newCart = updateQuantityUtil(productId, quantity);
    setCart([...newCart]);
  };

  const clearCart = () => {
    clearCartUtil();
    setCart([]);
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const coupons: { [key: string]: number } = {
      WELCOME10: 0.1,
      FESTIVE20: 0.2,
      PICKLELOVE: 50, // Fixed ₹50 off
    };

    const upperCode = code.toUpperCase();
    if (coupons[upperCode]) {
      const value = coupons[upperCode];
      const discountAmount = value < 1 ? Math.round(subtotal * value) : value;
      setDiscount(discountAmount);
      setAppliedCoupon(upperCode);
      return { success: true, message: "Coupon applied successfully!" };
    }
    return { success: false, message: "Invalid coupon code." };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        discount,
        totalPrice,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
