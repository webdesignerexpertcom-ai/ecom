"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function FloatingCart() {
  const { itemCount, setIsCartOpen } = useCart();

  if (itemCount === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-all hover:scale-110 active:scale-95 md:bottom-8"
    >
      <div className="relative">
        <ShoppingBag size={24} />
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-black uppercase ring-2 ring-white">
          {itemCount}
        </span>
      </div>
    </button>
  );
}
